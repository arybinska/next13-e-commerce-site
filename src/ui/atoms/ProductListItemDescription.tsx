import { type ProductItemType } from "../types";
import { formatPrice } from "../../utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, title, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="group">
			<h3 className="mt-4 text-lg font-medium text-gray-700 group-hover:underline">
				{title}
			</h3>
			<p>{category}</p>
			<p className="mt-1 text-lg font-medium text-gray-900">
				{formatPrice(price)}
			</p>
		</div>
	);
};
