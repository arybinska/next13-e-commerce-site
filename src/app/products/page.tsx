import { type Metadata } from "next";

import Products from "./[pageNumber]/page";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: `Products list`,
		openGraph: {
			title: `Products list`,
		},
	};
}

export default Products;
