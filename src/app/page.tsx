import { Button as ShadButton } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn, History } from "lucide-react";

import Link from "next/link";

export default async function Home() {
	const { userId } = await auth();
	const isAuth = !!userId;
	return (
		<main className="min-h-screen w-screen bg-gradient-to-br from-sky-400 to-sky-200">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center">
						<h1 className="text-5xl font-semibold"> Learn from any pdf</h1>
						<UserButton afterSignOutUrl="/"></UserButton>
					</div>
					<div className="flex mt-2">
						{isAuth && (
							<ShadButton className="p-2 gap-3 flex flex-row">
								<History />
								History
							</ShadButton>
						)}
					</div>
					<p>
						Learn more, learn faster about your documents with the help of AI
					</p>
					<div className="w-full mt-4">
						{isAuth ? (
							<h1>Upload your PDF</h1>
						) : (
							<Link href="/login">
								<ShadButton>
									<p className="mr-1">Sign In</p>
									<LogIn></LogIn>
								</ShadButton>
							</Link>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
