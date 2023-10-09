"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useState,
} from "react";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const [value] = useDebounce(query, 500);

	const handleSearchOnChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.value === "") {
			router.back();
		}

		setQuery(event.target.value);
	};

	const handleSearchOnSubmit = (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		router.push(`/search?query=${query?.toString()}`);
	};

	useEffect(() => {
		if (value) {
			router.push(`/search?query=${query?.toString()}`);
		}
	}, [query, router, value]);

	return (
		<form
			className="flex justify-between gap-3"
			action={`/search`}
			onSubmit={handleSearchOnSubmit}
		>

			<input
				name="search"
				type="search"
				role="searchbox"
				placeholder="Search..."
				autoComplete="off"
				value={query}
				onChange={handleSearchOnChange}
				className="w-full rounded-md border-gray-200 p-2 py-2.5 shadow-sm sm:text-sm"
			/>

			<button type="submit">
				<MagnifyingGlassIcon className="h-5 w-5 text-neutral-800" />
			</button>
		</form>
	);
};
