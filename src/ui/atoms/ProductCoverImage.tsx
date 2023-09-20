import Image from "next/image";
import { type ProductItemType } from "../types";
export const ProductCoverImage = ({
	product,
}: {
	product: ProductItemType;
}) => {
	return (
		<div className="group block overflow-hidden">
			<Image
				src={product.image}
				alt={product.title}
				width={400}
				height={400}
				className="h-96 w-full object-contain transition duration-500 group-hover:scale-105 group-hover:opacity-75"
			/>
		</div>
	);
};
