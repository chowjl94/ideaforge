import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		const { file_key, file_name } = body;
		console.log(file_key, file_name);
		return NextResponse.json({ message: "Success", status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Internal Server error", status: 500 });
	}
}
