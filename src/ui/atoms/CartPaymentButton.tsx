"use client";
import { useTransition } from "react";
import { paymentAction } from "../../app/cart/actions";

export const CartPaymentButton = () => {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="submit"
			disabled={isPending}
			className="w-1/2 max-w-md rounded-md bg-teal-700 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-gray-400"
			onClick={() =>
				startTransition(async () => {
					await paymentAction();
				})
			}
		>
			PAY
		</button>
	);
};
