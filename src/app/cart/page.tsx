import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "../../utils";
import { ProductImage } from "../../ui/atoms/ProductImage";
import { getCartByFromCookies } from "../../api/cart";
import { IncrementProductQuantity } from "../../ui/atoms/IncrementProductQuantity";
import { CartPaymentButton } from "../../ui/atoms/CartPaymentButton";
import { CartDeleteProductButton } from "../../ui/atoms/CartDeleteRoductButton";

export default async function CartPage() {
	const cart = await getCartByFromCookies();

	if (!cart || !cart.orderItems[0]) return redirect("/");
	const total = cart.orderItems.reduce(
		(acc, item) =>
			item.product ? acc + item.quantity * item.product.price : 0,
		0,
	);
	return (
		<div>
			<section>
				<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
					<div className="mx-auto max-w-3xl">
						<header className="text-center">
							<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
								Your Cart
							</h1>
						</header>

						<div className="mt-8">
							<ul className="space-y-4">
								{cart.orderItems.map((item) => {
									if (!item.product) {
										return null;
									}
									return (
										<li
											key={item.product.id}
											className="flex items-center gap-4"
										>
											{item.product.images[0] && (
												<ProductImage
													src={item.product.images[0].url}
													alt={item.product.name}
													width={80}
													height={80}
												/>
											)}

											<div>
												<h3 className="text-lg text-gray-900">
													{item.product.name}
												</h3>

												<dl className="text-m mt-0.5 space-y-px text-gray-600">
													<div>{formatPrice(item.product.price)}</div>
												</dl>
											</div>

											<div className="flex flex-1 items-center justify-end gap-2">
												{item.quantity && (
													<IncrementProductQuantity
														quantity={item.quantity}
														itemId={item.product.id}
														price={item.product.price}
													/>
												)}
												<CartDeleteProductButton itemId={item.id} />
											</div>
										</li>
									);
								})}
								<li className="text-end text-2xl">
									Total:{" "}
									<span className="font-semibold">
										{formatPrice(total)}
									</span>
								</li>
							</ul>

							<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
								<div className="w-screen max-w-lg space-y-4">
									<CartPaymentButton />
								</div>
							</div>
							<Link
								href="/cart/details"
								className="text-lg font-bold italic text-teal-500 hover:text-teal-300"
							>
								Details
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
