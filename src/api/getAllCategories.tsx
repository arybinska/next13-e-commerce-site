import { CategoriesGetListDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getAllCategories = async (): Promise<
	{ name: string; slug: string }[]
> => {
	const graphqlResponse = await executeGraphql(
		CategoriesGetListDocument,
		{},
	);

	return graphqlResponse.categories;
};
