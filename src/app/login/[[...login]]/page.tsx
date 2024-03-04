import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="min-h-screen w-screen bg-gradient-to-br from-sky-400 to-sky-200">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
				<SignIn />;
			</div>
		</div>
	);
}
