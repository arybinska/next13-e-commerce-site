/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.CartAddItemDocument,
    "mutation CartChangeItemQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CartCreate($productId: ID!, $total: Int!) {\n  createOrder(\n    data: {total: $total, orderItems: {create: {quantity: 1, total: $total, product: {connect: {id: $productId}}}}}\n  ) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        ...SingleProductItem\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    product {\n      ...SingleProductItem\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartUpsertProduct($orderId: ID, $productId: ID!, $total: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: 0, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total}}\n    where: {id: $orderId}\n  ) {\n    id\n  }\n}": types.CartUpsertProductDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    description\n  }\n}": types.CategoryGetBySlugDocument,
    "query CollectionGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    description\n  }\n}": types.CollectionGetBySlugDocument,
    "query CollectionsGetList {\n  collections {\n    name\n    slug\n    description\n  }\n}": types.CollectionsGetListDocument,
    "fragment Order on Order {\n  id\n  email\n  total\n  orderItems {\n    id\n    total\n    quantity\n    createdAt\n    product {\n      ...SingleProductItem\n    }\n  }\n}": types.OrderFragmentDoc,
    "query OrdersGetByEmail($email: String) {\n  orders(where: {email: $email}, stage: DRAFT) {\n    ...Order\n  }\n}": types.OrdersGetByEmailDocument,
    "mutation OrderUpdateCheckoutStripeId($id: ID, $email: String, $stripeCheckoutId: String) {\n  updateOrder(\n    data: {email: $email, stripeCheckoutId: $stripeCheckoutId}\n    where: {id: $id}\n  ) {\n    id\n  }\n}": types.OrderUpdateCheckoutStripeIdDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...SingleProductItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetReviewsRating($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}) {\n    edges {\n      node {\n        rating\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductGetReviewsRatingDocument,
    "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        ...SingleProductColorVariant\n      }\n      ... on ProductSizeColorVariant {\n        ...SingleProductSizeColorVariant\n      }\n      ... on ProductSizeVariant {\n        ...SingleProductSizeVariant\n      }\n    }\n  }\n}": types.ProductGetVariantsListDocument,
    "fragment ProductImage on Asset {\n  url\n  fileName\n}": types.ProductImageFragmentDoc,
    "fragment SingleProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    ...ProductImage\n  }\n}": types.SingleProductItemFragmentDoc,
    "fragment SingleProductSizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SingleProductColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SingleProductSizeVariant on ProductSizeVariant {\n  id\n  name\n}": types.SingleProductSizeColorVariantFragmentDoc,
    "fragment ProductListItem on Product {\n  id\n  name\n  price\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    ...ProductImage\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetCountDocument,
    "query ProductsGetCountInCategory($categorySlug: String) {\n  productsConnection(where: {categories_some: {_search: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetCountInCategoryDocument,
    "query ProductsGetList($search: String, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {_search: $search}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {_search: $search}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListSearchDocument,
    "fragment ReviewsItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  rating\n  stage\n}": types.ReviewsItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($productId: ID!, $total: Int!) {\n  createOrder(\n    data: {total: $total, orderItems: {create: {quantity: 1, total: $total, product: {connect: {id: $productId}}}}}\n  ) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        ...SingleProductItem\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    product {\n      ...SingleProductItem\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpsertProduct($orderId: ID, $productId: ID!, $total: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: 0, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total}}\n    where: {id: $orderId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartUpsertProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    description\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    description\n  }\n}"): typeof import('./graphql').CollectionGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    name\n    slug\n    description\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Order on Order {\n  id\n  email\n  total\n  orderItems {\n    id\n    total\n    quantity\n    createdAt\n    product {\n      ...SingleProductItem\n    }\n  }\n}"): typeof import('./graphql').OrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String) {\n  orders(where: {email: $email}, stage: DRAFT) {\n    ...Order\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation OrderUpdateCheckoutStripeId($id: ID, $email: String, $stripeCheckoutId: String) {\n  updateOrder(\n    data: {email: $email, stripeCheckoutId: $stripeCheckoutId}\n    where: {id: $id}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').OrderUpdateCheckoutStripeIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...SingleProductItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetReviewsRating($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}) {\n    edges {\n      node {\n        rating\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductGetReviewsRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        ...SingleProductColorVariant\n      }\n      ... on ProductSizeColorVariant {\n        ...SingleProductSizeColorVariant\n      }\n      ... on ProductSizeVariant {\n        ...SingleProductSizeVariant\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetVariantsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductImage on Asset {\n  url\n  fileName\n}"): typeof import('./graphql').ProductImageFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SingleProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    ...ProductImage\n  }\n}"): typeof import('./graphql').SingleProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SingleProductSizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SingleProductColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SingleProductSizeVariant on ProductSizeVariant {\n  id\n  name\n}"): typeof import('./graphql').SingleProductSizeColorVariantFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  price\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    ...ProductImage\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCountInCategory($categorySlug: String) {\n  productsConnection(where: {categories_some: {_search: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCountInCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($search: String, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {_search: $search}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {_search: $search}) {\n    aggregate {\n      count\n    }\n    pageInfo {\n      pageSize\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListSearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewsItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  rating\n  stage\n}"): typeof import('./graphql').ReviewsItemFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
