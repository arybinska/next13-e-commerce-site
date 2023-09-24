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

export type ProductType = {
	id: string;
	name: string;
	price: number;
	description: string;
	category: string;
	images?: { url: string };
};
