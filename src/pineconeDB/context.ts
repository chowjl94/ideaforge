import { convertToAscii } from "@/lib/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embedding";
import { PDFMetadata } from "@/lib/types/Types";

const getClosestMatchEmbeddings = async (
	embeddings: number[],
	filekey: string,
	pinecone: Pinecone
) => {
	try {
		const index = await pinecone.index(process.env.NEXT_PINECONE_INDEX!);
		const nameSpace = index.namespace(convertToAscii(filekey));
		const queryRes = await nameSpace.query({
			topK: 5,
			vector: embeddings,
			includeMetadata: true,
		});
		return queryRes.matches || [];
	} catch (error) {
		console.log("error querying embeddings", error);
		throw error;
	}
};

export const feedPDFContext = async (
	query: string,
	filekey: string,
	pinecone: Pinecone
) => {
	const queryEmbeddings = await getEmbeddings(query);
	const matches = await getClosestMatchEmbeddings(
		queryEmbeddings,
		filekey,
		pinecone
	);

	const likelyDocs = matches.filter(
		(match) => match.score && match.score > 0.7
	);

	let docs = likelyDocs.map(
		(doc) => (doc.metadata as PDFMetadata["metadata"])?.text
	);

	return docs.join("\n").substring(0, 3000);
};
