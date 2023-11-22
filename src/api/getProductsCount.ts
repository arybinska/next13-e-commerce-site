import {
	ProductsGetCountDocument,
	ProductsGetCountInCategoryDocument,
} from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductsCount = async (
	categorySlug?: string,
): Promise<number> => {
	if (!categorySlug) {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetCountDocument,
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
			},
		});
		return graphqlResponse.productsConnection.aggregate.count;
	} else {
		const graphqlResponse = await executeGraphql({
			query: ProductsGetCountInCategoryDocument,
			variables: { categorySlug },
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
			},
		});
		return graphqlResponse.productsConnection.aggregate.count;
	}
};
