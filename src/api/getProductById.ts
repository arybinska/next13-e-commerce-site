import { ProductGetByIdDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductById = async (
	id: string,
	withReview = false,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id,
			withReview,
		},
		next: { revalidate: 1 },
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});
	return graphqlResponse.product ? graphqlResponse.product : null;
};
