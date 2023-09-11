import { type ProductItemType } from "../types";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<div>
			<ProductCoverImage
				{...product.coverImage}
			/>
			<ProductListItemDescription
				product={product}
			/>
		</div>
	);
};
