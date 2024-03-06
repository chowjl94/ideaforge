import { downloadS3 } from "@/lib/s3/s3-server";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PDFContent } from "@/lib/types/Types";

const pc = new Pinecone({
	apiKey: process.env.NEXT_PINECONE_API_KEY!,
});

export const index = pc.index("quickstart");

export async function loadS3IntoPinecone(filekey: string) {
	// obtain pdf from s3
	const file_name = await downloadS3(filekey);
	if (!file_name) {
		throw new Error("Error with download from S3");
	}
	// returns the pages of the pdf
	const loader = new PDFLoader(file_name);
	const pages = (await loader.load()) as PDFContent[];

	// split pdf into chunks
	return pages;
}
