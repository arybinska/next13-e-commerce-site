import { type ProductListItemFragment } from "../../gql/graphql";
import { getProducts } from "../../api/getProducts";
import { ProductListItem } from "../molecules/ProductListItem";

export const AdditionalProductsList = async ({
	product,
}: {
	product?: ProductListItemFragment;
}) => {
	let response;
	if (!product) {
		response = await getProducts(3, 4);
		return (
			<div>
				{response && (
					<ul
						data-testid="products-list"
						className="mx-5 mb-10 mt-3 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					>
						{response.products.map((product) => (
							<ProductListItem key={product.id} product={product} />
						))}
					</ul>
				)}
			</div>
		);
	}
};
