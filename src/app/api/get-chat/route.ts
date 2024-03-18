import { db } from "@/db/neonDB";
import { messages as messageSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (req: Request) => {
	const { chatId } = await req.json();

	const _messages = await db
		.select()
		.from(messageSchema)
		.where(eq(messageSchema.chatId, chatId));
	return NextResponse.json(_messages);
};
