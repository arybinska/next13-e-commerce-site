// import { IncrementProductQuantity } from "../../../ui/atoms/IncrementProductQuantity";
// import { getCartByFromCookies } from "../../../api/cart";
// import { formatPrice } from "../../../utils";
// import { CartModal } from "../../../ui/atoms/CartModal";
// import { CartDeleteProductButton } from "../../../ui/atoms/CartDeleteRoductButton";
// import { CartPaymentButon } from "../../../ui/atoms/CartPaymentButton";

// export default async function CartModalPage() {
// 	const cart = await getCartByFromCookies();
// 	if (!cart || cart.order?.orderItems.length === 0) {
// 		return null;
// 	}

// 	const total = cart.order?.orderItems.reduce(
// 		(acc, item) =>
// 			item.product ? acc + item.quantity * item.product.price : 0,
// 		0,
// 	);

// 	return (
// 		<CartModal>
// 			<div className="p-6">
// 				<h1 className="text-3xl">Order</h1>
// 				<p>#{cart.order?.id}</p>
// 				<ul className="flex w-full flex-col gap-5 py-6">
// 					{cart.order?.orderItems.map(
// 						(item) =>
// 							item.product && (
// 								<li key={item.product.id}>
// 									<article className="grid grid-cols-5 items-center">
// 										<span className="col-span-3">
// 											{item.product.name}
// 										</span>
// 										<div className="col-span-1 self-center">
// 											<IncrementProductQuantity
// 												itemId={item.id}
// 												quantity={item.quantity}
// 												price={item.product.price}
// 											/>
// 										</div>
// 										<span className="col-span-2 text-center">
// 											{formatPrice(item.product.price / 100)}
// 										</span>
// 										<div className="col-span-1">
// 											<CartDeleteProductButton itemId={item.id} />
// 										</div>
// 									</article>
// 								</li>
// 							),
// 					)}
// 					<li className="text-end text-2xl">
// 						Total:{" "}
// 						<span className="font-semibold">
// 							{formatPrice(total / 100)}
// 						</span>
// 					</li>
// 					<li>
// 						<CartPaymentButon cart={cart} />
// 					</li>
// 				</ul>
// 			</div>
// 		</CartModal>
// 	);
// }
