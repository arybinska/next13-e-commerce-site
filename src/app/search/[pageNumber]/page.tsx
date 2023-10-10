import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/organisms/Pagination";
import { PER_PAGE } from "@/lib/consts";
import { getProducts } from "@/api/getProducts";


export async function generateMetadata({ params }: { params: { pageNumber: string } }): Promise<Metadata> {
	return {
		title: `Search - page ${params.pageNumber}`,
		openGraph: {
			title: `Search - page ${params.pageNumber}`,
		},
	};
}

export default async function Search({
	params : { pageNumber = "1" },
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams?: { [_key: string]: string | string[] | undefined };
}) {
	let currentPage = parseInt(pageNumber);
	const perPage = PER_PAGE;
	if (isNaN(currentPage)) {
		currentPage = 1;
	}
	const { query: searchValue } = searchParams as { [key: string]: string };
	const searchQuery = searchValue ?? "";

	const response = await getProducts(currentPage, perPage, searchQuery );
	const totalItems = response.pagination.totalItems;
	console.log(currentPage, perPage, totalItems);

	return (
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				{response.products.length === 0 && <div className="mt-10">Products not found.</div>}
				{response.products.length > 0 && (
					<>
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
						<ProductList key={currentPage} products={response.products} />
						<Pagination baseUrl={"/search"} perPage={perPage} currentPage={currentPage} totalItems={totalItems} />
					</>
				)}
			</div>

	);
}
