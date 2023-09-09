import { ProductList } from '@/ui/organisms/ProductList'
import { ProductItemType } from '@/ui/types'

const products: ProductItemType[] = [{id:'1', category: 'Kubek', name:"Kubek", price:2000, coverImage:{alt:"", src:""}}, {id:'1', category: 'Kubek', name:"Kubek", price:2000, coverImage:{alt:"", src:"/next.svg"}}]

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductList products={products}/>
    </section>
  )
}
