import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn, History, Gem, Lightbulb } from "lucide-react";
import { checkSubscription, getFirstChat } from "@/db/utils";
import FileUpload from "@/components/home/FileUpload";
import SubscriptionButton from "@/components/home/SubscriptionButtion";
import { Button as ShadButton } from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";
import indexpagess from "../../public/assets/images/indexpagess.png";
import Image from "next/image";

export default async function Home() {
	const { userId } = await auth();
	const isAuth = !!userId;
	const isPro = await checkSubscription();
	const firstChat = await getFirstChat(userId!);
	const tooltipMessage = isPro ? "Pro" : "Basic";

	return (
		<main className="min-h-screen w-screen bg-gradient-to-br from-sky-400 to-sky-200 p-4">
			<div className="absolute top-0 right-0">
				{isAuth && (
					<div className="flex flex-row gap-10 border border-black rounded-md p-4 bg-white">
						<Tooltip message={tooltipMessage}>
							<div className="pt-1">{isPro ? <Gem /> : <Lightbulb />}</div>
						</Tooltip>
						<UserButton afterSignOutUrl="/"></UserButton>
					</div>
				)}
			</div>

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center p-4">
						<h1 className="text-5xl font-semibold">
							Explore and learn from any PDF at your fingertips
						</h1>
					</div>
					<div className="flex p-4 gap-2">
						{isAuth && firstChat && (
							<>
								<Link href={`/chat/${firstChat.id}`}>
									<ShadButton className="p-2 gap-1 flex flex-row">
										<History />
										History
									</ShadButton>
								</Link>
								<SubscriptionButton isPro={isPro} />
							</>
						)}
					</div>
					<p>
						Learn more, learn faster about your PDF documents with the help of
						AI
					</p>
					<div className="w-full p-4">
						{isAuth ? (
							<FileUpload />
						) : (
							<Link href="/login">
								<ShadButton>
									<p className="mr-1">Sign In</p>
									<LogIn></LogIn>
								</ShadButton>
							</Link>
						)}
					</div>

					{!isAuth && (
						<div className="p-4">
							<Image src={indexpagess} width={600} height={400} alt={""} />
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
