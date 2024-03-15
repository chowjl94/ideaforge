import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
	isLoading: boolean;
	messages: Message[];
};

const ChatMessageList = ({ messages, isLoading }: Props) => {
	// const testBoj = [
	// 	{ content: "test1", role: "user", id: 1 },
	// 	{ content: "test", role: "assistant", id: 2 },
	// 	{ content: "test2", role: "user", id: 3 },
	// 	{ content: "test", role: "assistant", id: 4 },
	// 	{ content: "test3", role: "user", id: 5 },
	// 	{ content: "test", role: "assistant", id: 6 },
	// ];
	console.log(messages);
	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
			</div>
		);
	}
	if (!messages || messages.length === 0) {
		return (
			<div className="flex justify-center items-center h-full">
				<p>Chat with me!</p>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-2 px-4 h-full">
			{messages.map((message) => {
				return (
					<div
						key={message.id}
						className={cn("flex", {
							"justify-end pl-10": message.role === "user",
							"justify-start pr-10": message.role === "assistant",
						})}
					>
						<div
							className={cn(
								"rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
								{
									"bg-blue-600 text-white": message.role === "user",
								}
							)}
						>
							<p>{message.content}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ChatMessageList;
