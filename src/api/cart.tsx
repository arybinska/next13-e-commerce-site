import { cookies } from "next/headers";
import { executeGraphql } from "./graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) {
		return existingCart;
	}
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Cannot create cart");
	}
	return cart.createOrder;
}

export async function getCartFromCookies() {
	const cardId = cookies().get("cardId")?.value;
	if (cardId) {
		const cart = await executeGraphql(CartGetByIdDocument, {
			id: cardId,
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

function createCart() {
	return executeGraphql(CartCreateDocument, {});
}

export async function addItemToCart(
	cartId: string,
	productId: string,
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});
	if (!product) {
		throw new Error("Cannot find product");
	}
	await executeGraphql(CartAddProductDocument, {
		cartId,
		productId,
		total: product.price,
	});
}
