import AWS from "aws-sdk";

export const initialiseS3 = () => {
	AWS.config.update({
		region: "ap-southeast-1",
		accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
		secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
	});
	const s3 = new AWS.S3({
		params: {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
		},
		region: process.env.NEXT_PUBLIC_S3_REGION,
	});
	return s3;
};

export const uploadtoS3 = async (file: File) => {
	try {
		const s3 = initialiseS3();
		console.log();
		const file_key =
			"uploads/" +
			Date.now().toString() +
			"_" +
			file.name.replace(" ", "_").replace("-", "_");
		console.log(file.name, " this is in upload to s3 function");
		const isPrintableASCII = (string: string) => /^[\x20-\x7F]*$/.test(string);
		if (!isPrintableASCII(file_key)) {
			throw new Error(
				`${file_key} is not ascii-printable, pinecone will not accept`
			);
		}
		const params = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Key: file_key,
			Body: file,
		};

		const upload = s3
			.putObject(params)
			.on("httpUploadProgress", (evt) => {
				console.log(
					"uploading file to s3",
					parseInt(((evt.loaded * 100) / evt.total).toString()) + "%"
				);
			})
			.promise();

		await upload.then((data) => {
			console.log("successfully uploaded to S3", `filekey:${file_key}`);
		});

		return Promise.resolve({
			file_key,
			file_name: file.name,
		});
	} catch (error) {
		console.log("error");
	}
};

export const getS3Url = (file_key: string) => {
	const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
	return url;
};
