import { loadS3IntoPinecone } from "@/pineconeDB";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		const { file_key, file_name } = body;
		// pass to into pine cone
		const pages = await loadS3IntoPinecone(file_key);
		return NextResponse.json({
			message: "Success",
			status: 200,
			pages: [pages],
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Internal Server error", status: 500 });
	}
}
