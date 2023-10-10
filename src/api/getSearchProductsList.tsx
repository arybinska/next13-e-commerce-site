import { PER_PAGE } from "../lib/consts";
import { ProductsGetListDocument, type ProductListItemFragment } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";


type getProductListPromiseResponse = {
	products: ProductListItemFragment[];
	pagination: {
		totalItems: number;
		currentPage: number;
	};
};
export const getSearchProductsList = async (
	search: string,
	page: number,
	_take = PER_PAGE,
): Promise<getProductListPromiseResponse> => {

	const graphqlResponse = await executeGraphql(ProductsGetListDocument, {
		search,
	});

	if (!graphqlResponse || !graphqlResponse.products) {
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
