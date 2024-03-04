"use client";

import { useState, useRef } from "react";
import axios from "axios";
// import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button as ShadButton } from "@/components/ui/button";

import {
	Inbox,
	Loader2,
	XCircle,
	Upload,
	FileText,
	FileCheck2,
	ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

const FileUpload = () => {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploading, setUploading] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [fileData, setFileData] = useState<File | null>(null);

	const [formData, setFormData] = useState<FormData | null>(null);

	// const mutation = useMutation({
	// 	mutationFn: async ({
	// 		file_key,
	// 		file_name,
	// 	}: {
	// 		file_key: string;
	// 		file_name: string;
	// 	}) => {
	// 		const response = await axios.post("/api/create-chat", {
	// 			file_key,
	// 			file_name,
	// 		});
	// 		return response.data;
	// 	},
	// });

	// const { mutate, isError, error } = mutation;

	const handleDragEnter = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		console.log(isDragging);
		setIsDragging(true);
	};
	const handleDragOver = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileUpload = (file: File) => {
		setFileData(file);
		console.log("Uploading file:", file);
		const newFormData = new FormData();
		newFormData.append("file", file);
		setFormData(newFormData);
		try {
			console.log("Mutating the data");
			console.log("This is completed");
			// Simulate redirecting to the next page after 1 second
			setTimeout(() => console.log("Redirecting to the next page"), 1000);
			// router.push('/success-page');
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const handleDrop = async (e: {
		dataTransfer: any;
		preventDefault: () => void;
	}) => {
		e.preventDefault();
		setIsDragging(false);
		const files: any = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			const file = files[0];
			if (file) {
				handleFileUpload(file);
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsDragging(false);
		const file = e.target.files?.[0];
		if (file) {
			handleFileUpload(file);
		}
	};

	const handleRevert = () => {
		setFileData(null); // Reset fileData to null
		setFormData(null); // Reset formData to null
	};

	return (
		<div className="p-2 bg-white rounded-xl">
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
			<div
				className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col"
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
			>
				{fileData ? (
					<>
						<FileCheck2 className="h-10 w-10 text-blue-500" />
						<p>{fileData.name}</p>
					</>
				) : (
					<>
						<Inbox className="w-10 h-10 text-blue-500" />
						<p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
					</>
				)}
			</div>
			{fileData && formData && (
				<div className="flex flex-row pt-2 justify-between">
					<ShadButton
						variant="destructive"
						className="p-2 gap-3 flex flex-row hover:bg-red-700 focus:none"
						onClick={handleRevert}
					>
						<XCircle color="white" />
					</ShadButton>
					<ShadButton className="p-2 gap-1 flex flex-row">
						Chat <ArrowRight />{" "}
					</ShadButton>
				</div>
			)}
		</div>
	);
};

export default FileUpload;
