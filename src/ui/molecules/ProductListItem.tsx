import Link from "next/link";
import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { type ProductListItemFragment } from "../../gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<li
			key={product.id}
			className="group relative list-none overflow-hidden"
		>
			<Link href={`/product/${product.id}`}>
				<ProductCoverImage product={product} />
				<ProductListItemDescription product={product} />
			</Link>
		</li>
	);
};
