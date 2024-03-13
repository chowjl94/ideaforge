import { loadS3IntoPinecone } from "@/pineconeDB";
import { NextResponse } from "next/server";
import { db } from "@/db/neonDB";
import { chats } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { getS3Url } from "@/lib/s3/s3";
import { NeonChats } from "@/lib/types/Types";
import { Pinecone } from "@pinecone-database/pinecone";

// sending to pinecone throuhg the endpoint api/create-chat
// in pinecone a namespace is created for each set of vectors
// then inserts a record into neonDB
export async function POST(req: Request, res: Response) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	try {
		const body = await req.json();
		const { file_key, file_name } = body;
		// pass to into pine cone
		await loadS3IntoPinecone(
			file_key,
			new Pinecone({
				apiKey: process.env.NEXT_PINECONE_API_KEY!,
			})
		);
		console.log("sending to NeonDB");
		const values = {
			fileName: file_name,
			fileUrl: getS3Url(file_key),
			fileKey: file_key,
			userId: userId,
		};
		// insert the chat record into neon
		// for look up in the pinecone index and namespace
		const chat_id = await db
			.insert(chats)
			.values(values as unknown as NeonChats)
			.returning({
				insertedId: chats.id,
			});
		return NextResponse.json({
			message: "Succes",
			status: 200,
			chat_id: chat_id[0].insertedId,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Internal Server error", status: 500 });
	}
}
