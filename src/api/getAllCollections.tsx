import { CollectionsGetListDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getAllCollections = async () => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetListDocument,
		{},
	);

	return graphqlResponse.collections;
};
