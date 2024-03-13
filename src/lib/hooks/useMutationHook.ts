import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadtoS3 } from "@/lib/s3/s3";
import { ChatCreationRequest, UploadResponse } from "@/lib/types/Types";

export const useFileUploadMutation = () => {
	const router = useRouter();
	const [uploading, setIsUploading] = useState(false);

	const { mutate, isPending } = useMutation<
		UploadResponse,
		Error,
		ChatCreationRequest
	>({
		mutationFn: async ({ file_key, file_name }) => {
			const response = await axios.post("/api/create-chat", {
				file_key,
				file_name,
			});
			return response.data;
		},
	});

	// sends file to S3,
	// mutates the data by
	// sending to pinecone throuhg the endpoint api/create-chat
	// in pinecone a namespace is created for each set of vectors
	// then inserts a record into neonDB
	const handleFileUpload = async (formData: FormData, fileData: File) => {
		if (formData && fileData!.size < 15 * 1024 * 1024) {
			try {
				setIsUploading(true);
				const data = await uploadtoS3(fileData!);
				if (!data?.file_key || !data.file_name) {
					toast.error("Error uploading PDF");
				}
				mutate(data!, {
					onSuccess: (data) => {
						toast.success(data.message);
						router.push(`/chat/${data.chat_id}`);
					},
					onError: (err) => {
						toast.error(err.message);
					},
				});
			} catch (error) {
				toast.error("Error with uploading file");
			} finally {
				setIsUploading(false);
			}
		} else {
			toast.error("PDF File size exceeds 15MB");
			return;
		}
	};

	return { handleFileUpload, uploading, isPending };
};
