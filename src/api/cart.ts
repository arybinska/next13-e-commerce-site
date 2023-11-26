import { cookies } from "next/headers";
import {
	CartGetByIdDocument,
	CartUpsertProductDocument,
	CartCreateDocument,
} from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const createCartAndAddFirstProduct = async (
	productId: string,
	total: number,
) => {
	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		variables: { productId, total },
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true
	});

	return newCart.id;
};

export async function getCartByFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return;
	}
	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: { id: cartId },
		cache: "no-store",
		next: { tags: ["cart"] },
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});
	if (!cart.order) {
		return;
	}
	return cart.order;
}

export const addOrUpdateProductToCart = async (
	productId: string,
	total: number,
) => {
	const cart = await getCartByFromCookies();
	if (!cart) {
		const newCartId = await createCartAndAddFirstProduct(
			productId,
			total,
		);
		return newCartId;
	}
	const orderItem = cart.orderItems.find(
		(item) => item.product?.id === productId,
	);

	const cartId = await executeGraphql({
		query: CartUpsertProductDocument,
		variables: {
			productId,
			orderId: orderItem ? orderItem.id : cart.id,
			quantity: orderItem ? orderItem.quantity + 1 : 1,
			total: orderItem ? total * (orderItem.quantity + 1) : total,
		},
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});

	return cartId.upsertOrderItem?.id;
};
