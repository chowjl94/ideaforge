"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
	isPro: boolean;
};

const SubscriptionButton = ({ isPro }: Props) => {
	const [loading, setLoading] = useState(false);

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
