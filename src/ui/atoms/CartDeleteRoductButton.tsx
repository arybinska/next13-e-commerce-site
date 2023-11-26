"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "../../app/cart/actions";

type CartDeleteProductButtonProps = {
	itemId: string;
};

export const CartDeleteProductButton = ({
	itemId,
}: CartDeleteProductButtonProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="submit"
			disabled={isPending}
			className="w-50px rounded-md bg-teal-500 p-2 text-neutral-100 disabled:cursor-wait disabled:bg-gray-400"
			onClick={() =>
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				})
			}
		>
			REMOVE
		</button>
	);
};
