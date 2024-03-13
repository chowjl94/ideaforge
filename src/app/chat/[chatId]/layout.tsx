const ChatLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex max-h-screen overflow-scroll:hidden">
			<div className="flex w-full max-h-screen overflow-scroll:hidden">
				<>{children}</>
			</div>
		</div>
	);
};

export default ChatLayout;
