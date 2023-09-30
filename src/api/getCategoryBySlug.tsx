import { CategoryGetBySlugDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductsByCategorySlug = async (
	slug: string,
): Promise<getCategoryBySlugPromiseResponse> => {
	const graphqlResponse = await executeGraphql(
		CategoryGetBySlugDocument,
		{ slug },
	);
	if (
		!graphqlResponse.categories ||
		graphqlResponse.categories.length === 0 ||
		!graphqlResponse.categories[0]
	) {
		return null;
	}

	return graphqlResponse.categories[0];
};

type getCategoryBySlugPromiseResponse = {
	name: string;
	description?: string | null | undefined;
} | null;
