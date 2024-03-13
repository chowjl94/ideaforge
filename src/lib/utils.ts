import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string): string {
	let pattern = /^[\x20-\x7F]*$/; // Default: Remove non-printable ASCII

	const regex = new RegExp(pattern, "g");
	const asciiString = inputString.replace(regex, "");
	return asciiString;
}
