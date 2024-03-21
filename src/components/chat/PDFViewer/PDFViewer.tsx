"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button as ShadButton } from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
	const [key, setKey] = useState(0);
	const handleReload = () => {
		setKey(key + 1); // Increment key to trigger component rerender
	};
	const tooltipMessage = "Refresh the PDF!";

	return (
		<>
			<Tooltip message={tooltipMessage} position={"top-10"}>
				<ShadButton
					className="fixed z-99 border-white border "
					onClick={handleReload}
				>
					<RefreshCw />
				</ShadButton>
			</Tooltip>
			<iframe
				key={key}
				src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
				className="w-full h-full"
			></iframe>
		</>
	);
};

export default PDFViewer;
