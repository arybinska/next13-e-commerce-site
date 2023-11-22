"use server";

import { revalidateTag } from "next/cache";
import { addOrUpdateProductToCart } from "../../../api/cart";

export const addProductToCartAction = async (formData: FormData) => {
	const id = await addOrUpdateProductToCart(
		String(formData.get("productId")),
		Number(formData.get("productPrice")),
	);

	revalidateTag("cart");

	return id;
};
