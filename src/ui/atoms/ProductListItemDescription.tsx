import { formatPrice } from "../../utils";
import { type ProductListItemFragment } from "../../gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { categories, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="group">
			<h3 className="mt-4 text-lg font-medium text-gray-700 group-hover:underline">
				{name}
			</h3>
			{categories[0] && <p>{categories[0]?.name}</p>}
			<p className="mt-1 text-lg font-medium text-gray-900">
				{formatPrice(price)}
			</p>
		</div>
	);
};
