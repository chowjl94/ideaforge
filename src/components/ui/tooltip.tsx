import React, { ReactNode } from "react";

interface TooltipProps {
	message: string;
	children: ReactNode;
	position: string;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children, position }) => {
	const spanClass = `absolute ${position} scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100`;
	return (
		<div className="group relative inline-block">
			{children}
			<span className={spanClass}>{message}</span>
		</div>
	);
};

export default Tooltip;
