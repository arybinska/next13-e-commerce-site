import { CollectionGetBySlugDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getCollectionBySlug = async (
	slug: string,
): Promise<getCollectionBySlugPromiseResponse> => {
	const graphqlResponse = await executeGraphql({
		query: CollectionGetBySlugDocument,
		variables: { slug },
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});

	if (
		!graphqlResponse.collections ||
		graphqlResponse.collections.length === 0 ||
		!graphqlResponse.collections[0]
	) {
		return null;
	}

	return graphqlResponse.collections[0];
};
type getCollectionBySlugPromiseResponse = {
	name: string;
	description?: string | null;
} | null;
