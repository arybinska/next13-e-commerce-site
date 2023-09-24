import { type ProductItemType } from "../ui/types";

export const getProductsCount = async () => {
	const response = await fetch(
		"https://naszsklep-api.vercel.app/api/products?take=100000",
		{
			cache: "no-store",
		},
	);
	const products = (await response.json()) as ProductItemType[];

	return products.length;
};

//All Products
export const getAllProducts = async () => {
	const res = await fetch(
		"https://naszsklep-api.vercel.app/api/products",
	);
	const productsResponse = (await res.json()) as ProductItemType[];
	const products = productsResponse.map((product) =>
		productResponseItemToProductItemType(product),
	);
	return products;
};

// Pagination
export const PRODUCTS_PER_PAGE = 20;
export const getProductsForPage = async (page: string) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PRODUCTS_PER_PAGE}&offset=${
			PRODUCTS_PER_PAGE * (Number(page) - 1)
		}`,
	);
	const productsResponse = (await res.json()) as ProductItemType[];
	const products = productsResponse.map((product) =>
		productResponseItemToProductItemType(product),
	);
	return products;
};

//Single Product
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
