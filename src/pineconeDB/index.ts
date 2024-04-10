import { downloadS3 } from "@/lib/s3/s3-server";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PDFDocument } from "@/lib/types/Types";
import { chunkifyPage, embedifyDocument } from "./embedding";
import { convertToAscii } from "@/lib/utils";
// import { APIThrottler } from "./utils"; // Adjust the path as needed

// const throttler = new APIThrottler(3);

export async function loadS3IntoPinecone(filekey: string, pinecone: Pinecone) {
	try {
		// obtain pdf from s3
		const file_name = await downloadS3(filekey);
		if (!file_name) {
			throw new Error("Error with download from S3");
		}
		// returns the pages of the pdf
		const loader = new PDFLoader(file_name);
		// split pdf into its pages
		const pages = (await loader.load()) as PDFDocument[];

		// split each page into smaller chunks
		const documents = await Promise.all(
			pages.map((page) => {
				return chunkifyPage(page); // Make sure chunkifyPage() returns PDFDocument
			})
		);
		// vectorise and embed to save it into pineCone
		const vectors = await Promise.all(
			documents.flat().map((doc) => embedifyDocument(doc))
		);
		if (!process.env.NEXT_PINECONE_INDEX) {
			throw new Error("Pinecone index does not exist");
		}
		const index = pinecone.index(process.env.NEXT_PINECONE_INDEX!);
		console.log(`inserting vector into ${[process.env.NEXT_PINECONE_INDEX]} `);
		const namespace = convertToAscii(filekey);
		await index.namespace(namespace).upsert(vectors);
		console.log("upserted to", namespace);
		return documents[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}
