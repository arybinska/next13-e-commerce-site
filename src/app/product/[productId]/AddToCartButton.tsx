"use client";

import {experimental_useFormStatus as useFormStatus } from "react-dom";
export const AddToCartButton = () => {
    const formStatus = useFormStatus()
	return (
		<button
			type="submit"
            disabled={formStatus.pending}
			className="inline-block justify-center disabled:cursor-wait disabled:bg-indigo-900 rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-center font-medium text-white hover:bg-indigo-700"
		>
			Dodaj do koszyka
		</button>
	);
};
