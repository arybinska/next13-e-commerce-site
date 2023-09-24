import { Suspense } from "react";
import { getAllProducts } from "../../api/products";
import { ProductList } from "../../ui/organisms/ProductList";

export default async function ProductsPage() {
	const products = await getAllProducts();

	return (
		<>
			<Suspense fallback="Ładowanie…">
				<ProductList products={products.slice(0, 4)} />
			</Suspense>
		</>
	);
}
