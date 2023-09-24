import { Suspense } from "react";
import { PaginationControls } from "../../../ui/atoms/PaginationControls";
import {
	PRODUCTS_PER_PAGE,
	getProductsCount,
	getProductsForPage,
} from "../../../api/products";
import { ProductList } from "../../../ui/organisms/ProductList";

export default async function ProductsByPage({
	params,
}: {
	params: { page_number: string };
}) {
	const page = params.page_number;
	const per_page = PRODUCTS_PER_PAGE;
	const productsPerPage = await getProductsForPage(page);
	const allProducts = await getProductsCount();
	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	return (
		<>
			<Suspense fallback="Ładowanie…">
				<ProductList products={productsPerPage} />
			</Suspense>

			<PaginationControls
				hasNextPage={end < allProducts}
				hasPrevPage={start > 0}
				pageNumber={page}
				allProducts={allProducts}
			/>
		</>
	);
}
