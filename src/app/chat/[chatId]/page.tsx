import { db } from "@/db/neonDB";
import { chats } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Chatbar, PDFViewer, Sidebar } from "@/components/chat";

type Props = {
	params: {
		chatId: string;
	};
};

const ChatPage = async ({ params: { chatId } }: Props) => {
	const { userId } = await auth();
	const _chats = await db.select().from(chats).where(eq(chats.userId, userId!));
	const [isAuthenticated, hasChats, requestedChatExists] = await Promise.all([
		userId !== undefined,
		_chats && _chats.length > 0,
		_chats.some((chat) => chat.id === parseInt(chatId)),
	]);

	if (!isAuthenticated || !hasChats || !requestedChatExists) {
		return redirect(!isAuthenticated ? "/signup" : "/");
	}
	const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
	return (
		<>
			<div className="flex-[1] max-w-xs h-full">
				<Sidebar chats={_chats} chatId={chatId} isPro={true} />
			</div>
			{/* pdf viewer */}
			<div className="max-h-screen p-4 oveflow-scroll flex-[5]">
				<PDFViewer pdf_url={currentChat?.fileUrl || ""} />
			</div>
			{/* chat component */}
			<div className="flex-[3] border-l-4 border-l-slate-200">
				{/* <ChatComponent chatId={parseInt(chatId)} /> */}
				<Chatbar />
			</div>
		</>
	);
};

export default ChatPage;
