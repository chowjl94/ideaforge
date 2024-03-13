import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// export function convertToAscii(inputString: string) {
// 	// remove non ascii characters
// 	const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
// 	return asciiString;
// }

export function convertToAscii(inputString: string): string {
	// Build the regular expression pattern based on options
	let pattern = /^[\x20-\x7F]*$/; // Default: Remove non-printable ASCII
	// /^[\x20-\x7F]*$/

	const regex = new RegExp(pattern, "g");
	const asciiString = inputString.replace(regex, "");
	return asciiString;
}
