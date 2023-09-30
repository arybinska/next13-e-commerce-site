import { ProductGetBySlugDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql(
		ProductGetBySlugDocument,
		{
			slug,
		},
	);
	return graphqlResponse.products[0]
		? graphqlResponse.products[0]
		: null;
};
