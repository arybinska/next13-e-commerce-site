import { ProductListItem } from "../molecules/ProductListItem";
import { type ProductListItemFragment } from "../../gql/graphql";

export const ProductList = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => {
	return (
		<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
			<div
				data-testid="products-list"
				className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8"
			>
				{products.map((product) => (
					<ProductListItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};
