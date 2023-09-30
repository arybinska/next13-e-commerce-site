import { ProductGetByIdDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductById = async (
	id: string,
	withReview = false,
) => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{
			id,
			withReview,
		},
	);
	return graphqlResponse.product ? graphqlResponse.product : null;
};
