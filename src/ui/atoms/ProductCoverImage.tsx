import NextImage from "next/image";
import { type ProductListItemFragment } from "../../gql/graphql";

export const ProductCoverImage = ({
	product,
}: {
	product: ProductListItemFragment;
}) => {
	return (
		<div className="group block overflow-hidden">
			{product.images[0] && (
				<NextImage
					src={product.images[0].url}
					alt={product.name}
					width={400}
					height={400}
					className="h-96 w-full object-contain transition duration-500 group-hover:scale-105 group-hover:opacity-75"
				/>
			)}
		</div>
	);
};
