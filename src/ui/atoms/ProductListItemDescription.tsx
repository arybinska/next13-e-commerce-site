import { type ProductItemType } from "../types";
import { formatPrice } from "../../utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<>
			<h3 className="mt-4 text-sm text-gray-700">{name}</h3>
			<p>{category}</p>
			<p className="mt-1 text-lg font-medium text-gray-900">
				{formatPrice(price)}
			</p>
		</>
	);
};
