import { CollectionsGetListDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getAllCollections = async () => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetListDocument,
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});

	return graphqlResponse.collections;
};
