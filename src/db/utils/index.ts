import { auth } from "@clerk/nextjs";
import { db } from "../neonDB";
import { chats, user_subscriptions } from "../schema";
import { eq } from "drizzle-orm";

export const checkSubscription = async () => {
	const DAY_IN_MS = 1000 * 60 * 60 * 24;
	const { userId } = await auth();
	if (!userId) {
		return false;
	}

	const _userSubscriptions = await db
		.select()
		.from(user_subscriptions)
		.where(eq(user_subscriptions.userId, userId));

	if (!_userSubscriptions[0]) {
		return false;
	}

	const userSubscription = _userSubscriptions[0];

	const isValid =
		userSubscription.stripePriceId &&
		// their time left plus a day ,
		userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
			Date.now();

	return !!isValid;
};

export const getFirstChat = async (userId: string) => {
	let firstChat;
	firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
	if (firstChat) {
		firstChat = firstChat[0];
	}
	return firstChat;
};
