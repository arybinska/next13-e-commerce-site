import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage"
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription"
import { ProductItemType } from "../types";

type ProductListItemProps = {
    product:ProductItemType
};

export const ProductListItem = ({product}:ProductListItemProps) => {return (<div><ProductCoverImage {...product.coverImage} /><ProductListItemDescription product={product} /></div>)}