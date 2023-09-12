import { type ProductItemType } from "../types";
import { ProductListItem } from "../molecules/ProductListItem";

export const ProductList = ({
	products,
}: {
	products: ProductItemType[];
}) => {
	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<ul
				data-testid="products-list"
				className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
			>
				{products.map((product) => (
					<li key={product.id} className="list-none">
						<a href={product.coverImage.src} className="group">
							<ProductListItem product={product} />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
