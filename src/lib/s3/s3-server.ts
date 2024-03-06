import fs from "fs";
import path from "path";
import os from "os";
import { initialiseS3 } from "./s3";

export const downloadS3 = async (file_key: string) => {
	try {
		const s3 = initialiseS3();
		const params = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Key: file_key,
		};
		const pdfObj = await s3.getObject(params).promise();
		console.log(pdfObj);

		// Generate a temporary file path using platform-independent methods
		const temp_name = path.join(os.tmpdir(), `pdf-${Date.now()}.pdf`);

		// Write the file using the generated temporary path
		fs.writeFileSync(temp_name, pdfObj.Body as Buffer);
		return temp_name;
	} catch (err) {
		console.log(err);
	}
};
