import Stripe from "stripe";
import { redirect } from "next/navigation";
import { addStripeCheckoutId } from "../../../api/order";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}
	if (!searchParams.sessionId) {
		redirect("/");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const stripeCheckoutSession =
		await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	if (stripeCheckoutSession.metadata?.cartId) {
		await addStripeCheckoutId(
			stripeCheckoutSession.metadata.cartId,
			stripeCheckoutSession.customer_details?.email ?? "",
			stripeCheckoutSession.id,
		);
	}

	return <div>{stripeCheckoutSession.payment_status}</div>;
}
