import { db } from "@/db/neonDB";
import { user_subscriptions } from "@/db/schema";
import { stripe } from "@/stripe/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;
	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.NEXT_STRIPE_WEBHOOK_SIGNING_SECRET as string
		);
	} catch (error) {
		return new NextResponse("webhook error", { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	// new subscription created
	if (event.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);
		if (!session?.metadata?.userId) {
			return new NextResponse("no userid", { status: 400 });
		}
		// insert this new user in DB
		await db.insert(user_subscriptions).values({
			userId: session.metadata.userId,
			stripeCustId: subscription.customer as string,
			stripeSubId: subscription.id,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);
		await db
			.update(user_subscriptions)
			.set({
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000
				),
			})
			.where(eq(user_subscriptions.stripeSubId, subscription.id));
	}

	return new NextResponse(null, { status: 200 });
}
