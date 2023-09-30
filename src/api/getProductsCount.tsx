import {
	ProductsGetCountDocument,
	ProductsGetCountInCategoryDocument,
} from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductsCount = async (
	categorySlug?: string,
): Promise<number> => {
	if (!categorySlug) {
		const graphqlResponse = await executeGraphql(
			ProductsGetCountDocument,
			{},
		);
		return graphqlResponse.productsConnection.aggregate.count;
	} else {
		const graphqlResponse = await executeGraphql(
			ProductsGetCountInCategoryDocument,
			{ categorySlug },
		);
		return graphqlResponse.productsConnection.aggregate.count;
	}
};
