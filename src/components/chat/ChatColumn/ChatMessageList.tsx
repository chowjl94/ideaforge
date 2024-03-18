import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type DrizzleMessage = {
	id: number;
	createdAt: Date;
	chatId: number;
	chatContent: string;
	role: "system" | "user";
};

type Props = {
	isLoading: boolean;
	messages: Message[];
};

const ChatMessageList = ({ messages, isLoading }: Props) => {
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
				const drizzleMessage =
					"chatContent" in message
						? (message as unknown as DrizzleMessage)
						: null;
				const normalMessage =
					"content" in message ? (message as Message) : null;

				return (
					<div
						key={message.id}
						className={cn("flex pb-5", {
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
							<p>
								{drizzleMessage
									? drizzleMessage.chatContent
									: normalMessage
									? normalMessage.content
									: ""}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ChatMessageList;
