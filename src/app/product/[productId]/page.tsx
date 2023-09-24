import { Suspense } from "react";
import { type Metadata } from "next/types";
import {
	getAllProducts,
	getProductById,
} from "../../../api/products";
import { formatPrice } from "../../../utils";
import { SuggestedProductsList } from "../../../ui/organisms/SuggestedProducts";
import { ProductImage } from "../../../ui/atoms/ProductImage";

export const generateStaticParams = async () => {
	const products = await getAllProducts();
	return products.map((product) => ({
		productId: product.id,
	}));
};
export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product.title} - E-commerce site`,
		description: `${product.description}`,
		openGraph: {
			title: `${product.title} - E-commerce site`,
			description: `${product.description}`,
			images: [
				{
					url: `${product.image}`,
					width: 500,
					height: 500,
					alt: `${product.title}`,
				},
			],
		},
	};
};

export default async function SingleProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	return (
		<>
			<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
				<ProductImage product={product} />
				<div className="ml-10 mt-10 h-full w-full object-cover object-center">
					<div className="lg:col-span-2 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.title}
						</h1>
					</div>
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<p className="sr-only">Product information</p>
						<p className="mt-4 text-3xl tracking-tight text-gray-900">
							{formatPrice(product.price)}
						</p>
						<div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-8 lg:pr-8 lg:pt-6">
							<div>
								<h3 className="mb-5 mt-5 font-bold sm:text-lg">
									Description
								</h3>
								<div className="space-y-6">{product.description}</div>
							</div>
						</div>
					</div>
					<button className="mb-5 inline-block justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-center font-medium text-white hover:bg-indigo-700">
						Dodaj do koszyka
					</button>

					<div className="mx-auto max-w-screen-xl py-4">
						<h2 className="font-bold sm:text-lg">Customer Reviews</h2>
						<div className="mb-4  mt-4 flex items-center">
							<p className="text-3xl font-medium">
								{product.rating.rate}
								<span className="sr-only">Average review score</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<aside>
				<Suspense fallback={"Ładowanie..."}>
					<div className="mx-auto max-w-2xl lg:max-w-7xl ">
						<h3 className="font-bold sm:text-lg">
							Inni także kupili:
						</h3>
					</div>
					<SuggestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}
