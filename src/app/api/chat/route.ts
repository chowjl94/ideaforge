import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
	apiKey: process.env.NEXT_OPEN_AI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
	try {
		const { messages } = await req.json();
		console.log(messages);
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			messages,
		});
		// Convert the response into a friendly text-stream
		const stream = OpenAIStream(response);
		// Respond with the stream
		return new StreamingTextResponse(stream);
	} catch (err) {
		return err;
	}
}
