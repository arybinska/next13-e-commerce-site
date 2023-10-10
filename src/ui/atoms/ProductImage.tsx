import NextImage from "next/image";

type ProductListItemImageProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export const ProductImage = ({
	src,
	alt,
	width = 500,
	height = 500,
}: ProductListItemImageProps) => {
	return (
		<div className="ml-5 object-cover object-center">
			<NextImage src={src} alt={alt} width={width} height={height} />
		</div>
	);
};
