"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && (
				<div className="flex justify-center">
					<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
				</div>
			)}
			<iframe
				src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
				className="w-full h-full"
				onLoad={handleLoad}
			></iframe>
		</>
	);
};

export default PDFViewer;
