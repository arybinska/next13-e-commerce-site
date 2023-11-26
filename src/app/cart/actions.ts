"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { executeGraphql } from "../../api/graphqlApi";
import {
	CartRemoveItemDocument,
	CartChangeItemQuantityDocument,
} from "../../gql/graphql";
import { getCartByFromCookies } from "../../api/cart";

export const removeItem = async (itemId: string) => {
	const deleteItem = executeGraphql({
		query: CartRemoveItemDocument,
		variables: { itemId },
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});
	revalidateTag("cart");
	return deleteItem;
};

export const updateItemQuantity = async (
	itemId: string,
	quantity: number,
	price: number,
) => {
	const changeItem = await executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: {
			itemId,
			quantity,
			total: price * quantity,
		},
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});

	revalidateTag("cart");
	return changeItem;
};

export async function paymentAction() {
	if (!process.env.STRIPE_SECRET_KEY) {
		return new Response("No Stripe secret key", { status: 500 });
	}
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});
	const cart = await getCartByFromCookies();
	if (!cart) {
		return;
	}

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "p24"],
		metadata: { cartId: cart.id },
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "eur",
				product_data: { name: item.product?.name || "" },
				unit_amount: item.product?.price || 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url:
			"https://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "https://localhost:3000/cart/cancel",
	});

	if (!checkoutSession.url) {
		throw new Error("Something went wrong");
	}
	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
