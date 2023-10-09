import { notFound } from "next/navigation";
import { ProductGetBySlugDocument } from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql(
		ProductGetBySlugDocument,
		{
			slug,
		},
	);
	const product =  graphqlResponse.products[0]
		? graphqlResponse.products[0]
		: null;
	if (!product) {
		throw notFound();
	}
	return product;

};
