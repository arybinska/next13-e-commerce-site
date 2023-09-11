import Image from "next/image";
export const ProductCoverImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
			<Image
				src={src}
				alt={alt}
				width={400}
				height={400}
				className="object-cover object-center group-hover:opacity-75"
			/>
		</div>
	);
};
