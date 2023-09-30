"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ActiveLink } from "./ActiveLink";

export const PaginationItem = ({
	baseUrl,
	page,
}: {
	baseUrl: string;
	page: number;
}) => {
	const query = useSearchParams();
	const [url, setUrl] = useState({
		pathname: `${baseUrl}/${page}`,
		query: query.toString(),
	});
	useEffect(() => {
		setUrl({
			pathname: `${baseUrl}/${page}`,
			query: query.toString(),
		});
	}, [query, baseUrl, page]);

	const defaultClassName =
		"relative inline-flex items-center px-4 py-2 text-sm font-semibold";
	const className = clsx({
		[defaultClassName]: true,
		"text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0":
			true,
	});
	const activeClassName = clsx({
		[defaultClassName]: true,
		"z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
			true,
	});
	return (
		<ActiveLink
			exact
			href={url}
			className={className}
			activeClassName={activeClassName}
		>
			{page}
		</ActiveLink>
	);
};
