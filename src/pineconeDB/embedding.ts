import { PDFDocument } from "@/lib/types/Types";
import { OpenAIApi, Configuration } from "openai-edge";
import {
	Document,
	RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5";

const config = new Configuration({
	apiKey: process.env.NEXT_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

const getEmbeddings = async (text: string) => {
	try {
		const response = await openai.createEmbedding({
			model: "text-embedding-ada-002",
			input: text.replace(/\n/g, " "),
		});
		const result = await response.json();
		return result.data[0].embedding as number[];
	} catch (error) {
		console.log("error calling openai embeddings api", error);
		throw error;
	}
};

export async function embedifyDocument(document: PDFDocument) {
	try {
		// converting page  contet into a vector
		const embeddings = await getEmbeddings(document.pageContent);
		// hash the vector so we can id the vector
		const hash = md5(document.pageContent);
		return {
			id: hash,
			values: embeddings,
			metadata: {
				text: document.metadata.text,
				pageNumber: document.metadata.loc.pageNumber,
			},
		} as PineconeRecord;
	} catch (error) {
		console.log("error embedding document", error);
		throw error;
	}
}

export const contentStringByBytes = (str: string, bytes: number) => {
	const enc = new TextEncoder();
	return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

// prepares a page into a document by converting string to bytes
export async function chunkifyPage(page: PDFDocument) {
	let { pageContent, metadata } = page;
	pageContent = pageContent.replace(/\n/g, "");
	// split the docs
	const splitter = new RecursiveCharacterTextSplitter();
	const docs = await splitter.splitDocuments([
		new Document({
			pageContent,
			metadata: {
				// finding the page number
				pageNumber: metadata.loc.pageNumber,
				// tex of the pageContent that will be converted to bytes
				text: contentStringByBytes(pageContent, 36000),
			},
		}),
	]);
	return docs as unknown as PDFDocument;
}
