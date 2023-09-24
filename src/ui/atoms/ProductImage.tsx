import Image from "next/image";
import { type ProductItemType } from "../types";
export const ProductImage = ({
	product,
}: {
	product: ProductItemType;
}) => {
	return (
		<div className="ml-5 h-full w-full object-cover object-center">
			<Image
				src={product.image}
				alt={product.title}
				width={500}
				height={500}
			/>
		</div>
	);
};
