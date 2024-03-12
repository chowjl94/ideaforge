import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { chats } from "@/db/schema";
import { NeonChats } from "@/lib/types/Types";

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		console.log(body);

		const { file_key, file_name } = body;
		console.log(file_key, file_name);
		// pass to into pine cone
		// await loadS3IntoPinecone(file_key);
		const values = {
			fileName: file_name,
			fileUrl: "teststring.com",
			fileKey: file_key,
			userId: "ox1123123Test",
		};
		console.log("inserting into NeonDB");
		const chat_id = await db
			.insert(chats)
			.values(values as unknown as NeonChats)
			.returning({
				insertedId: chats.id,
			});
		console.log("chatId inserted into NeonDB");
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
