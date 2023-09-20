"use client";
import { useState } from "react";

export const ProductCounter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount((count) => count - 1)}>
				-
			</button>
			<input readOnly value={count} />
			<button onClick={() => setCount((count) => count + 1)}>
				+
			</button>
		</div>
	);
};
