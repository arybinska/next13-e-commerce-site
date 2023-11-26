import { CategoriesGetListDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getAllCategories = async (): Promise<
	{ name: string; slug: string }[]
> => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetListDocument,
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});

	return graphqlResponse.categories;
};
