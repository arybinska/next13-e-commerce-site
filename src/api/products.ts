import { type ProductType, type ProductItemType } from "../ui/types";
import {
	ProductsGetListDocument,
	type TypedDocumentString,
} from "../gql/graphql";

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}
	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({ query, variables }),
		headers: { "Content-Type": "application/json" },
	});
	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse =
		(await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}
	return graphqlResponse.data;
};

export const getProductsList = async (): Promise<ProductType[]> => {
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);
	return graphqlResponse.products.map((p) => {
		return {
			id: p.id,
			category: p.categories[0]?.name || "",
			name: p.name,
			price: p.price,
			description: p.description,
			images: p.images[0] && {
				url: p.images[0].url,
			},
		};
	});
};

// Amount of products
export const getProductsCount = async () => {
	const response = await fetch(
		"https://naszsklep-api.vercel.app/api/products?take=100000",
		{
			cache: "no-store",
		},
	);
	const products = (await response.json()) as ProductItemType[];

	return products.length;
};

//All Products
export const getAllProducts = async () => {
	const res = await fetch(
		"https://naszsklep-api.vercel.app/api/products",
	);
	const productsResponse = (await res.json()) as ProductItemType[];
	const products = productsResponse.map((product) =>
		productResponseItemToProductItemType(product),
	);
	return products;
};

// Pagination
export const PRODUCTS_PER_PAGE = 20;
export const getProductsForPage = async (page: string) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PRODUCTS_PER_PAGE}&offset=${
			PRODUCTS_PER_PAGE * (Number(page) - 1)
		}`,
	);
	const productsResponse = (await res.json()) as ProductItemType[];
	const products = productsResponse.map((product) =>
		productResponseItemToProductItemType(product),
	);
	return products;
};

//Single Product
export const getProductById = async (id: ProductItemType["id"]) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productResponse = (await res.json()) as ProductItemType;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (
	product: ProductItemType,
) => {
	return {
		id: product.id,
		title: product.title,
		category: product.category,
		price: product.price,
		image: product.image,
		description: product.description,
		longDescription: product.longDescription,
		rating: {
			rate: product.rating.rate,
			count: product.rating.count,
		},
	};
};
