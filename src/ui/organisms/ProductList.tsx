import { ProductListItem } from "@/ui/molecules/ProductListItem"
import { ProductItemType } from "../types"

export const ProductList =({products}:{products:ProductItemType[]}) => { return (      <ul className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
{products.map((product) => <li key={product.id} className="flex flex-col items-center justify-between p-4"><ProductListItem product={product}/></li>)}

</ul>)}