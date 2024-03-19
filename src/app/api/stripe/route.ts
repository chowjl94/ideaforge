import { db } from "@/db/neonDB";
import { user_subscriptions } from "@/db/schema";
import { stripe } from "@/stripe/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const return_url = process.env.NEXT_BASE_URL + "/";

export const GET = async () => {
	try {
		const { userId } = await auth();
		const user = await currentUser();
		if (!userId) {
			return new NextResponse("unauthorised", { status: 401 });
		}
		// getting the usersubscription detail of userId
		const _userSubscriptions = await db
			.select()
			.from(user_subscriptions)
			.where(eq(user_subscriptions.userId, userId));
		if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustId) {
			// trying to cancel at the billing portal
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: _userSubscriptions[0].stripeCustId,
				return_url,
			});
			return NextResponse.json({ url: stripeSession.url });
		}
		// user first time subscribing
		const stripeSession = await stripe.checkout.sessions.create({
			success_url: return_url,
			cancel_url: return_url,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user?.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "Ideaforge Pro",
							description: "Unlimited PDF sessions!",
						},
						unit_amount: 1800,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
			},
		});

		console.log(_userSubscriptions);
		return NextResponse.json({ url: stripeSession.url });
	} catch (error) {
		console.log("stripe error", error);
		return new NextResponse("internal server error", { status: 500 });
	}
};
