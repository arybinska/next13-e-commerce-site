import {
	type ProductListItemFragment,
	ProductsGetByCollectionSlugDocument,
} from "../gql/graphql";
import { PER_PAGE } from "../lib/consts";
import { executeGraphql } from "./graphqlApi";

export const getCollectionProductsBySlug = async (
	slug: string,
	page = 1,
	take = PER_PAGE,
): Promise<getProductListPromiseResponse> => {
	const currentPage = page;
	const offset = take * (currentPage - 1);

	const graphqlResponse = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			first: take,
			skip: offset,
			slug,
		},
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});

	if (!graphqlResponse.products.length) {
		return {
			products: [],
			pagination: {
				currentPage,
				totalItems: 0,
			},
		};
	}

	return {
		products: graphqlResponse.products,
		pagination: {
			currentPage,
			totalItems: graphqlResponse.productsConnection.aggregate.count,
		},
	};
};
type getProductListPromiseResponse = {
	products: ProductListItemFragment[];
	pagination: {
		totalItems: number;
		currentPage: number;
	};
};
