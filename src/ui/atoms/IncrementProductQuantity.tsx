"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { updateItemQuantity } from "../../app/cart/actions";

export function IncrementProductQuantity({
	itemId,
	quantity,
	price,
}: {
	itemId: string;
	quantity: number;
	price: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);

	return (
		<form className="flex">
			<button
				className="h-6 w-6"
				type="submit"
				data-testid="decrement"
				disabled={optimisticQuantity <= 1}
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await updateItemQuantity(
						itemId,
						optimisticQuantity - 1,
						price,
					);
				}}
			>
				<MinusIcon />
			</button>

			<span data-testid="quantity" className="w-8 text-center">
				{optimisticQuantity}
			</span>
			<button
				className="h-6 w-6"
				data-testid="increment"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await updateItemQuantity(
						itemId,
						optimisticQuantity + 1,
						price,
					);
				}}
			>
				<PlusIcon />
			</button>
		</form>
	);
}
