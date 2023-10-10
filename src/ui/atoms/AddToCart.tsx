import { cookies } from "next/headers";
import { AddToCartCounter } from "./AddToCartCounter";
import { addItemToCart, getOrCreateCart } from "@/api/cart";
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";
import { type ProductListItemFragment } from "@/gql/graphql";

type AddToCartProps = {
	product: ProductListItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addToCartAction(_formData: FormData) {
		"use server";
		const cart = await getOrCreateCart();
		cookies().set("cardId", cart.id, {
			httpOnly: true,
			sameSite: "lax",
			//secure: true, - tylko na produkcji
		});
		await addItemToCart(cart.id, product.id);
	}

	return (
		<div className="flex items-center">
			<AddToCartCounter />
			<form className="items-center" action={addToCartAction}>
				<AddToCartButton />
			</form>
		</div>
	);
};
