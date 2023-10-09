import {
	type ProductListItemFragment,
	ProductsGetListDocument,
} from "../gql/graphql";
import { PER_PAGE } from "../lib/consts";
import { executeGraphql } from "./graphqlApi";

type getProductListPromiseResponse = {
	products: ProductListItemFragment[];
	pagination: {
		totalItems: number;
		currentPage: number;
	};
};
export const getProducts = async (
	page: number,
	take = PER_PAGE,
	search = "",
): Promise<getProductListPromiseResponse> => {
	const offset = take * (page - 1);

	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{
			first: take,
			skip: offset,
			search,
		},
	);

	if (!graphqlResponse.products) {
		return {
			products: [],
			pagination: {
				currentPage: page,
				totalItems: 0,
			},
		};
	}

	return {
		products: graphqlResponse.products,
		pagination: {
			currentPage: page,
			totalItems: graphqlResponse.productsConnection.aggregate.count,
		},
	};
};
