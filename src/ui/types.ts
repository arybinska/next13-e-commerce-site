export type ProductItemType = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: string;
		count: string;
	};
	image: string;
	longDescription: string;
};
