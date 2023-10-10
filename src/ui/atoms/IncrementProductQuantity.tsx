"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";

export function IncrementProductQuantity({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex">
			{optimisticQuantity > 1 && (
				<button
					className="h-6 w-6"
					type="submit"
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantity - 1);
						await changeItemQuantity(itemId, optimisticQuantity - 1);
					}}
				>
					-
				</button>
			)}
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				className="h-6 w-6"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
}
