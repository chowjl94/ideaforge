import OpenAI from "openai";
import { eq } from "drizzle-orm";
import { db } from "@/db/neonDB";
import { Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";
import { createOAIprompt } from "@/lib/utils";
import { feedPDFContext } from "@/pineconeDB/context";
import { OpenAIStream, StreamingTextResponse, Message } from "ai";
import { chats as chatSchema, messages as messageSchema } from "@/db/schema";
// import { DrizzleMessage } from "@/lib/types/Types";

const openai = new OpenAI({
	apiKey: process.env.NEXT_OPEN_AI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
	try {
		const pinecone = new Pinecone({
			apiKey: process.env.NEXT_PINECONE_API_KEY!,
		});
		const { messages, chatId } = await req.json();
		const lastMessage = messages[messages.length - 1];
		const _chats = await db
			.select()
			.from(chatSchema)
			.where(eq(chatSchema.id, chatId!));
		if (_chats.length != 1) {
			return NextResponse.json({ message: "Chat not found", status: 404 });
		}

		const context = await feedPDFContext(
			lastMessage.content,
			_chats[0].fileKey,
			pinecone
		);

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			messages: [
				createOAIprompt(context),
				...messages.filter((message: Message) => message.role === "user"),
			],
		});

		// Convert the response into a friendly text-stream
		const stream = OpenAIStream(response, {
			onStart: async () => {
				{
					await db.insert(messageSchema).values({
						chatId: chatId,
						chatContent: lastMessage.content,
						role: "user",
					});
				}
			},
			onCompletion: async (completion) => {
				{
					await db.insert(messageSchema).values({
						chatId: chatId,
						chatContent: completion,
						role: "system",
					});
				}
			},
		});
		// Respond with the stream
		return new StreamingTextResponse(stream);
	} catch (err) {
		if (err instanceof OpenAI.APIError) {
			const { name, status, headers, message } = err;
			return NextResponse.json({ name, status, headers, message }, { status });
		} else {
			throw err;
		}
	}
}
