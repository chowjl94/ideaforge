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
		const file_key =
			"uploads/" + Date.now().toString() + file.name.replace(" ", "-");

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
			console.log("successfully uploaded to S3", file_key);
		});

		return Promise.resolve({
			file_key,
			file_name: file.name,
		});
	} catch (error) {
		console.log("this");
	}
};

export const getS3Url = (file_key: string) => {
	const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
	return url;
};
