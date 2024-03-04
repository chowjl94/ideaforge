import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

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
		<ClerkProvider>
			<html lang="en">
				<body className={cn("font-IBMPLEX antialiased", IBMPLEX.variable)}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
