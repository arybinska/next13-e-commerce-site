import NextImage from "next/image";

type ProductListItemImageProps = {
	src: string;
	alt: string;
};

export const ProductImage = ({
	src,
	alt,
}: ProductListItemImageProps) => {
	return (
		<div className="ml-5 h-full w-full object-cover object-center">
			<NextImage src={src} alt={alt} width={500} height={500} />
		</div>
	);
};
