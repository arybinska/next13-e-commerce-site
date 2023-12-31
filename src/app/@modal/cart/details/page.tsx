import Image from "next/image";
import { IncrementProductQuantity } from "../../../../ui/atoms/IncrementProductQuantity";
import { getCartByFromCookies } from "../../../../api/cart";
import { formatPrice } from "../../../../utils";
import { CartModal } from "../../../../ui/atoms/CartModal";
import { CartDeleteProductButton } from "../../../../ui/atoms/CartDeleteRoductButton";
import { CartPaymentButton } from "../../../../ui/atoms/CartPaymentButton";

export default async function CartModalPage() {
	const cart = await getCartByFromCookies();
	if (!cart || cart.orderItems.length === 0) {
		return null;
	}

	const total = cart.orderItems.reduce(
		(acc, item) =>
			item.product ? acc + item.quantity * item.product.price : 0,
		0,
	);

	return (
		<CartModal>
			<div className="p-6">
				<h1 className="text-3xl">Your Cart</h1>
				<p>Order Number: {cart.id}</p>
				<ul className="flex w-full flex-col gap-5 py-6">
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<li key={item.product.id}>
									<article className="grid grid-cols-5 items-center">
										<span className="col-span-1">
											{item.product.name}
										</span>
										<Image
											className="col-span-1"
											alt="product"
											src={item.product.images[0]?.url ?? ""}
											width={80}
											height={80}
										/>
										<div className="col-span-1 self-center">
											<IncrementProductQuantity
												itemId={item.id}
												quantity={item.quantity}
												price={item.product.price}
											/>
										</div>
										<span className="col-span-1 text-center">
											{formatPrice(item.product.price)}
										</span>
										<div className="col-span-1">
											<CartDeleteProductButton itemId={item.id} />
										</div>
									</article>
								</li>
							),
					)}
					<li className="text-end text-2xl">
						Total:{" "}
						<span className="font-semibold">
							{formatPrice(total)}
						</span>
					</li>
					<li>
						<CartPaymentButton />
					</li>
				</ul>
			</div>
		</CartModal>
	);
}
