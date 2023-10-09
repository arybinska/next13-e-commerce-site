import { type Metadata } from "next";
import { PER_PAGINATION } from "../../../lib/consts";
import { getProductsCount } from "../../../api/getProductsCount";
import { ProductList } from "../../../ui/organisms/ProductList";
import { getProducts } from "../../../api/getProducts";
import { Pagination } from "../../../ui/organisms/Pagination";

export async function generateMetadata({
	params,
}: {
	params: { pageNumber: string };
}): Promise<Metadata> {
	return {
		title: `Products list - page ${params.pageNumber}`,
		openGraph: {
			title: `Products list - page ${params.pageNumber}`,
		},
	};
}

export const generateStaticParams = async () => {
	const productsCount = await getProductsCount();

	const numberOfPages = Math.ceil(productsCount / PER_PAGINATION);
	const productPages = [];
	for (let i = 0; i < numberOfPages; i++) {
		productPages.push({
			pageNumber: `${i + 1}`,
		});
	}
	return productPages;
};

export default async function Products({
	params: { pageNumber = "1" },
}: {
	params: { pageNumber: string };
	searchParams?: { [_key: string]: string | string[] | undefined };
}) {
	let currentPage = parseInt(pageNumber);
	const perPage = PER_PAGINATION;

	if (isNaN(currentPage)) {
		currentPage = 1;
	}

	const response = await getProducts(currentPage, perPage, "");
	const totalItems = response.pagination.totalItems;

	return (
		<>
			{response.products.length === 0 && (
				<div className="mt-10">Products not found.</div>
			)}
			{response.products.length > 0 && (
				<>
					<ProductList
						key={currentPage}
						products={response.products}
					/>
					<Pagination
						baseUrl={"/products"}
						perPage={perPage}
						currentPage={currentPage}
						totalItems={totalItems}
					/>
				</>
			)}
		</>
	);
}
