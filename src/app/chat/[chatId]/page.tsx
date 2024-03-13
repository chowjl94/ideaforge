type Props = {
	params: {
		chatId: string;
	};
};

const ChatPage = ({ params: { chatId } }: Props) => {
	return <div>this is chat {chatId}</div>;
};

export default ChatPage;
