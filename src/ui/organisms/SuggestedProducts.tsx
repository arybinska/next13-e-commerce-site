import { type ProductListItemFragment } from "../../gql/graphql";
import { getProducts } from "../../api/getProducts";
import { ProductListItem } from "../molecules/ProductListItem";

export const SuggestedProductsList = async ({
	product,
}: {
	product?: ProductListItemFragment;
}) => {
	let response;
	if (!product) {
		response = await getProducts(1, 4);
		return (
			<>
				{response && (
					<ul
						data-testid="related-products"
						className="mx-5 mb-10 mt-3 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					>
						{response.products.map((product) => (
							<ProductListItem key={product.id} product={product} />
						))}
					</ul>
				)}
			</>
		);
	}
};
