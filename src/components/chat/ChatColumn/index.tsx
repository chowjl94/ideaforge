"use client";
import axios from "axios";
import Chatbar from "./Chatbar";
import ChatMessageList from "./ChatMessageList";
import { useEffect } from "react";
import { useChat } from "ai/react";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";

type Props = { chatId: number };

const Chat = ({ chatId }: Props) => {
	//getting messages based on chatId
	const { data, isLoading: isFetchingChat } = useQuery({
		queryKey: ["chat", chatId],
		queryFn: async () => {
			const response = await axios.post<Message[]>("/api/get-chat", {
				chatId,
				messages,
			});
			return response.data;
		},
	});

	// sending chatId to /api/chat
	// chatId of the currernt pdf chat
	// and sending inital chat messages
	// messages hisotry will be updated
	// https://sdk.vercel.ai/docs/api-reference/use-chat#usechat
	const {
		input,
		handleInputChange,
		handleSubmit,
		messages,
		isLoading: isStreaming,
	} = useChat({
		api: "/api/chat",
		body: {
			chatId,
		},
		initialMessages: data || [],
	});

	useEffect(() => {
		const messageContainer = document.getElementById("message-container");
		if (messageContainer) {
			messageContainer.scrollTo({
				top: messageContainer.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	return (
		<div
			className="flex flex-col h-full justify-between"
			id="message-container"
		>
			<div className="top-0 inset-x-0 p-2 bg-white h-fit">
				<h3 className="text-xl font-bold">Chat</h3>
			</div>

			<ChatMessageList messages={messages} isLoading={isFetchingChat} />

			<Chatbar
				handleSubmit={handleSubmit}
				handleInputChange={handleInputChange}
				input={input}
			/>
		</div>
	);
};

export default Chat;
