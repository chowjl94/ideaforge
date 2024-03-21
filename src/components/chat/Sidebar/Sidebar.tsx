"use client";
import React from "react";
import Link from "next/link";
import { Gem, Lightbulb, MessageCircle, PlusCircle } from "lucide-react";
import { DrizzleChat } from "@/lib/types/Types";
import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SubscriptionButton from "@/components/home/SubscriptionButtion";
import { UserButton } from "@clerk/nextjs";
import Tooltip from "@/components/ui/tooltip";

type Props = {
	chats: DrizzleChat[];
	chatId: string;
	currentChat:
		| {
				userId: string;
				id: number;
				fileName: string;
				fileUrl: string;
				fileKey: string;
				createdAt: Date;
		  }
		| undefined;
	isPro: boolean;
};

const Sidebar = ({ chats, chatId, isPro }: Props) => {
	const tooltipMessage = isPro ? "Pro" : "Basic";

	return (
		<div className="flex flex-col justify-between w-full min-h-screen p-4 text-gray-200 bg-gray-900">
			<div className="flex flex-col">
				<Link href="/">
					<ShadButton className="flex flex-row p-2 gap-1 border-white border w-full">
						<PlusCircle className="mr-2 w-4 h-4" />
						New chat
					</ShadButton>
				</Link>
				<div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
					{chats.map((chat) => (
						<Link key={chat.id} href={`/chat/${chat.id}`}>
							<div
								className={cn(
									"rounded-lg p-3 text-slate-300 flex items-center",
									{
										"bg-blue-600 text-white": chat.id === parseInt(chatId),
										"hover:text-white": chat.id !== parseInt(chatId),
									}
								)}
							>
								<MessageCircle className="mr-2" />
								<p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
									{chat.fileName}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>

			<div className="grid grid-flow-col justify-between">
				<SubscriptionButton isPro={isPro} />
				<div className="flex flex-row gap-2 px-2 pt-1 bg-white rounded-md">
					<Tooltip message={tooltipMessage} position={"bottom-10"}>
						<div className="pt-1">
							{isPro ? <Gem /> : <Lightbulb color="black" />}
						</div>
					</Tooltip>
					<UserButton afterSignOutUrl="/"></UserButton>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
