import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCreationRequest, UploadResponse } from "@/lib/types/Types";

export const useFileUploadMutationTest = () => {
	const router = useRouter();
	const [uploading, setIsUploading] = useState(false);

	const { mutate, isPending } = useMutation<
		UploadResponse,
		Error,
		ChatCreationRequest
	>({
		mutationFn: async ({ file_key, file_name }) => {
			console.log(file_key, file_name);
			const response = await axios.post("/api/test-connection", {
				file_key,
				file_name,
			});
			return response.data;
		},
	});

	const handleFileUploadTest = async () => {
		try {
			setIsUploading(true);
			// const data = await uploadtoS3(fileData!);
			const data = {
				file_key: "file_key_test",
				file_name: "file_key_test",
			};
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
	};

	return { handleFileUploadTest, uploading, isPending };
};
