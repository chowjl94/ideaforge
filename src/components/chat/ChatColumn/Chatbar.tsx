import { ChangeEvent, FormEvent } from "react";
import { Textfield } from "./Textfield";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatRequestOptions } from "ai";

type Props = {
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => void;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	input: string;
};

const Chatbar = ({ handleSubmit, handleInputChange, input }: Props) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="bottom-0 inset-x-0 px-2 py-4 bg-white"
		>
			<div className="flex">
				<Textfield
					value={input}
					onChange={handleInputChange}
					placeholder="Ask any question..."
					className="w-full"
				/>
				<Button className="bg-blue-600 ml-2">
					<Send className="h-4 w-4" />
				</Button>
			</div>
		</form>
	);
};

export default Chatbar;
