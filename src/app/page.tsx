import { ProductList } from "../ui/organisms/ProductList";
import { type ProductItemType } from "../ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		name: "Earthen Bottle",
		category: "bottles",
		price: 4800,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
			alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
		},
	},
	{
		id: "2",
		name: "Nomad Tumbler",
		category: "bottles",
		price: 3500,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
			alt: "Olive drab green insulated bottle with flared screw lid and flat top.",
		},
	},
	{
		id: "3",
		name: "Focus Paper Refill",
		category: "papers",
		price: 8900,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
			alt: "Person using a pen to cross a task off a productivity paper card.",
		},
	},
	{
		id: "4",
		name: "Machined Mechanical Pencil",
		category: "pencils",
		price: 3500,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
			alt: "Hand holding black machined steel mechanical pencil with brass tip and top.",
		},
	},
];

export default function Home() {
	return (
		<div className="bg-white">
			<ProductList data-testid="products-list" products={products} />
		</div>
	);
}
