"use client";
import { toast } from "react-hot-toast";
import { useState, useRef } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { Inbox, XCircle, FileCheck2, ArrowRight, Loader2 } from "lucide-react";
import { useFileUploadMutation } from "@/lib/hooks/useMutationHook";

const FileUpload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [fileData, setFileData] = useState<File | null>(null);
	const [formData, setFormData] = useState<FormData | null>(null);

	const { handleFileUpload, uploading, isPending } = useFileUploadMutation();

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

	const handleDrop = async (e: {
		dataTransfer: any;
		preventDefault: () => void;
	}) => {
		e.preventDefault();
		setIsDragging(false);
		const files: any = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			const file = files[0];
			if (file && file.type === "application/pdf") {
				setFileData(file);
				const newFormData = new FormData();
				newFormData.append("file", file);
				setFormData(newFormData);
			} else {
				toast.error("Please select a PDF file.");
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsDragging(false);
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			setFileData(file);
			const newFormData = new FormData();
			newFormData.append("file", file);
			setFormData(newFormData);
		} else {
			toast.error("Please select a PDF file.");
		}
	};

	const handleRevert = () => {
		setFileData(null);
		setFormData(null);
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
						{!isPending && !uploading ? (
							<>
								<FileCheck2 className="h-10 w-10 text-blue-500" />
								<p>{fileData.name}</p>
							</>
						) : (
							<>
								<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
								<p className="mt-2 text-sm text-slate-400">
									Spilling Tea to GPT...
								</p>
							</>
						)}
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
					<ShadButton
						className="p-2 gap-1 flex flex-row"
						onClick={() => handleFileUpload(formData!, fileData!)}
					>
						Chat <ArrowRight />
					</ShadButton>
				</div>
			)}
		</div>
	);
};

export default FileUpload;
