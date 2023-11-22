import { revalidateTag } from "next/cache";
import { addToCart, getOrCreateCart } from "../../../api/cart";

import { type SingleProductItemFragment } from "../../../gql/graphql";
import { AddToCartButton } from "./AddToCartButton";

export const AddToCart = (props: {
	product: SingleProductItemFragment;
}) => {
	const { product } = props;
	async function addToCartAction() {
		"use server";

		const cart = await getOrCreateCart();

		await addToCart(cart, product);

		revalidateTag("cart");
	}
	return (
		<div className="flex items-center">
			<form className="items-center" action={addToCartAction}>
				<AddToCartButton />
			</form>
		</div>
	);
};
