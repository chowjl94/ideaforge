import React, { ReactNode } from "react";

interface TooltipProps {
	message: string;
	children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
	return (
		<div className="group relative inline-block">
			{children}
			<span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
				{message}
			</span>
		</div>
	);
};

export default Tooltip;
