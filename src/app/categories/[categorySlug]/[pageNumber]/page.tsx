import { type Metadata } from "next";

import { PER_PAGE } from "../../../../lib/consts";
import { Pagination } from "../../../../ui/organisms/Pagination";
import { ProductList } from "../../../../ui/organisms/ProductList";
import { getCategoryProductsBySlug } from "../../../../api/getCategoryProductsBySlug";
import { getProductsByCategorySlug } from "../../../../api/getCategoryBySlug";

export async function generateMetadata({
	params,
}: {
	params: { pageNumber: string; categorySlug: string };
}): Promise<Metadata> {
	const categorySlug = params.categorySlug;
	const category = await getProductsByCategorySlug(categorySlug);

	return {
		title: category
			? `${category.name} list - page ${params.pageNumber}`
			: "",
		description: category?.description ?? "",
		openGraph: {
			title: `${categorySlug} list - page ${params.pageNumber}`,
			description: category?.description ?? "",
		},
	};
}

export default async function Categories({
	params: { pageNumber = "1", categorySlug = "" },
}: {
	params: { pageNumber: string; categorySlug: string };
}) {
	let currentPage = parseInt(pageNumber);
	const perPage = PER_PAGE;
	if (isNaN(currentPage)) {
		currentPage = 1;
	}
	const baseUrl = `/categories/${categorySlug}`;
	const response = await getCategoryProductsBySlug(
		categorySlug,
		currentPage,
		perPage,
	);
	const totalItems = response.pagination.totalItems;
	const category = await getProductsByCategorySlug(categorySlug);

	return (
		<>
			<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
				{response.products.length === 0 && (
					<div className="mt-10">Products not found.</div>
				)}
				{response.products.length > 0 && (
					<>
						<h2 className="text-center text-2xl font-bold capitalize tracking-tight text-gray-900">
							{category?.name ?? categorySlug}
						</h2>
						<ProductList
							key={currentPage}
							products={response.products}
						/>
						<Pagination
							baseUrl={baseUrl}
							perPage={perPage}
							currentPage={currentPage}
							totalItems={totalItems}
						/>
					</>
				)}
			</div>
		</>
	);
}
