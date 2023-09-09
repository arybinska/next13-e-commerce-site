import { formatPrice } from "@/utils"
import { ProductItemType } from "../types"

type  ProductListItemDescriptionProps = {
    product: ProductItemType
}

export const ProductListItemDescription = ({product: {category, name, price}}:ProductListItemDescriptionProps) => {
    return (<div><p>{category}{name}{formatPrice(price)}</p></div>)
}