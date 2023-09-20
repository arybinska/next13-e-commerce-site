import { type ProductItemType } from "../ui/types";

export const getProductsList = async () => {
	const res = await fetch(
		"https://naszsklep-api.vercel.app/api/products",
	);
	const productsResponse = (await res.json()) as ProductItemType[];
	const products = productsResponse.map((product) =>
		productResponseItemToProductItemType(product),
	);
	return products;
};

export const getProductById = async (id: ProductItemType["id"]) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productResponse = (await res.json()) as ProductItemType;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (
	product: ProductItemType,
) => {
	return {
		id: product.id,
		title: product.title,
		category: product.category,
		price: product.price,
		image: product.image,
		description: product.description,
		longDescription: product.longDescription,
		rating: {
			rate: product.rating.rate,
			count: product.rating.count,
		},
	};
};
