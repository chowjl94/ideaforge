"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
	isPro: boolean;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubscriptionButton = ({ isPro, loading, setLoading }: Props) => {
	const handleSubscription = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Button
			disabled={loading}
			onClick={handleSubscription}
			variant="outline"
			className="text-yellow-500 w-full"
		>
			{isPro ? "Manage Subscriptions" : "Get Pro"}
		</Button>
	);
};

export default SubscriptionButton;
