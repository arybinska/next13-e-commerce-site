import Link from "next/link";
import { type ProductItemType } from "../types";
import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<div className="relative">
			<Link href={`/product/${product.id}`}>
				<ProductCoverImage product={product} />
				<ProductListItemDescription product={product} />
			</Link>
		</div>
	);
};
