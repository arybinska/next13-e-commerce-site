import { getProductsList } from "../../api/products";
import { ProductList } from "./ProductList";

// const sleep = (ms: number) =>
// 	new Promise((resolve) => setTimeout(resolve, ms));

export const SuggestedProductsList = async () => {
	const products = await getProductsList();
	return <ProductList products={products.slice(-4)} />;
};
