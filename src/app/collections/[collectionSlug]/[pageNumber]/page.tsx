import { type Metadata } from "next";
import { ProductList } from "../../../../ui/organisms/ProductList";
import { Pagination } from "../../../../ui/organisms/Pagination";
import { getCollectionBySlug } from "../../../../api/getCollectionBySlug";
import { PER_PAGE } from "../../../../lib/consts";
import { getCollectionProductsBySlug } from "../../../../api/getCollectionProductsBySlug";

export async function generateMetadata({
	params,
}: {
	params: { pageNumber: string; collectionSlug: string };
}): Promise<Metadata> {
	const collectionSlug = params.collectionSlug;
	const collection = await getCollectionBySlug(collectionSlug);

	return {
		title: collection?.name ?? "",
		description: collection?.description ?? "",
		openGraph: {
			title: `${collectionSlug} list - page ${params.pageNumber}`,
			description: collection?.description ?? "",
		},
	};
}

export default async function Collection({
	params: { pageNumber = "1", collectionSlug = "" },
}: {
	params: { pageNumber: string; collectionSlug: string };
}) {
	let currentPage = parseInt(pageNumber);
	const perPage = PER_PAGE;
	if (isNaN(currentPage)) {
		currentPage = 1;
	}
	const baseUrl = `/collections/${collectionSlug}`;
	const productResponse =
		await getCollectionProductsBySlug(collectionSlug);
	const totalItems = productResponse.pagination.totalItems;
	const collection = await getCollectionBySlug(collectionSlug);
	const products = productResponse.products;

	return (
		<>
			{collection?.name && (
				<h1 className="mt-10 text-center text-2xl">
					{collection?.name}
				</h1>
			)}
			<div className="mx-auto max-w-2xl px-10 py-5 sm:px-10 sm:py-5 lg:max-w-7xl lg:px-8">
				{products.length === 0 && (
					<div className="mt-10">Products not found.</div>
				)}
				{products.length > 0 && (
					<>
						<ProductList key={currentPage} products={products} />
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
