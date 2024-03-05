import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/provider/Provider";

import cn from "classnames";
import "./globals.css";

const IBMPLEX = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
	title: "Ideaforge",
	description: "AI powered image generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				signIn: { baseTheme: neobrutalism },
				signUp: { baseTheme: neobrutalism },
			}}
		>
			<Providers>
				<html lang="en">
					<body className={cn("font-IBMPLEX antialiased", IBMPLEX.variable)}>
						<Toaster />
						{children}
					</body>
				</html>
			</Providers>
		</ClerkProvider>
	);
}
