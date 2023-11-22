import { Suspense } from "react";
import { type Metadata } from "next/types";
import { notFound } from "next/navigation";
import { formatPrice } from "../../../utils";
import { SuggestedProductsList } from "../../../ui/organisms/SuggestedProducts";
import { ProductImage } from "../../../ui/atoms/ProductImage";
import { getProductById } from "../../../api/getProductById";
import { SubmitButton } from "../../../ui/atoms/SubmitButton";
import { addProductToCartAction } from "./actions";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product?.name} - E-commerce site`,
		description: `${product?.description}`,
		openGraph: {
			title: `${product?.name} - E-commerce site`,
			description: `${product?.description}`,
			images: [
				{
					url: `${product?.name}`,
					width: 500,
					height: 500,
					alt: `${product?.name}`,
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
	if (!product) {
		throw notFound();
	}
	return (
		<>
			<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
				{product.images[0] && (
					<ProductImage
						src={product.images[0].url}
						alt={product.name}
					/>
				)}
				<div className="ml-10 mt-10 h-full w-full object-cover object-center">
					<div className="lg:col-span-2 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.name}
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
					<div className="mt-10 flex items-center">
						<form action={addProductToCartAction}>
							<input
								type="text"
								name="productId"
								value={product.id}
								hidden
								readOnly
							/>
							<input
								type="number"
								name="productPrice"
								value={product.price}
								hidden
								readOnly
							/>
							<SubmitButton label={"ADD TO CART"} />
						</form>
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
