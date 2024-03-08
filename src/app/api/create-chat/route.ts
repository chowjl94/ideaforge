import { loadS3IntoPinecone } from "@/pineconeDB";
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { chats } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { getS3Url } from "@/lib/s3/s3";
import { NeonChats } from "@/lib/types/Types";

export async function POST(req: Request, res: Response) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	try {
		const body = await req.json();
		const { file_key, file_name } = body;
		// pass to into pine cone
		await loadS3IntoPinecone(file_key);
		const chat_id = await db
			.insert(chats)
			.values({
				fileKey: file_key,
				pdfName: file_name,
				pdfUrl: getS3Url(file_key),
				userId,
			} as unknown as NeonChats)
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
