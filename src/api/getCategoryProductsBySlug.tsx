import { PER_PAGE } from "../lib/consts";
import {
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
} from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getCategoryProductsBySlug = async (
	slug: string,
	page: number = 1,
	take = PER_PAGE,
): Promise<getProductListPromiseResponse> => {
	const currentPage = page;
	const offset = take * (currentPage - 1);

	const graphqlResponse = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{
			first: take,
			skip: offset,
			slug,
		},
	);

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
