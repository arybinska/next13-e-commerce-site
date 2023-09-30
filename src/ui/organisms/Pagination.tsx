"use client";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PaginationSeparator } from "../atoms/PaginationSeparator";
import { getPaginationItems } from "../../utils";
import { PaginationItem } from "../atoms/PaginationItem";

export function Pagination({
	baseUrl,
	perPage,
	currentPage,
	totalItems,
}: {
	baseUrl: string;
	perPage: number;
	currentPage: number;
	totalItems: number;
}) {
	const query = useSearchParams();

	const productsCount = totalItems;
	const numberOfPages = Math.ceil(totalItems / perPage);
	const pages = getPaginationItems(numberOfPages, currentPage);
	const showPagination = Math.ceil(totalItems / perPage) > 1;
	if (!showPagination) {
		return null;
	}

	const isPreviousLink = currentPage !== 1;
	const previousLink = {
		pathname: `${baseUrl}/${currentPage - 1}`,
		query: query.toString(),
	};
	const isNextLink = numberOfPages !== currentPage;

	const nextLink = {
		pathname: `${baseUrl}/${currentPage + 1}`,
		query: query.toString(),
	};
	const showingFrom = (currentPage - 1) * perPage + 1;
	const showingTo = currentPage * perPage;
	return (
		<div className=" mx-10 flex items-center justify-between border-t border-gray-200 bg-white py-10">
			<div className="flex flex-1 justify-between sm:hidden">
				{isPreviousLink && (
					<Link
						href={previousLink}
						aria-label="Previous Page"
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Previous
					</Link>
				)}
				{isNextLink && (
					<Link
						href={nextLink}
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Next
					</Link>
				)}
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{showingFrom}</span>{" "}
						to{" "}
						<span className="font-medium">
							{productsCount > showingTo ? showingTo : productsCount}
						</span>{" "}
						of <span className="font-medium">{productsCount}</span>{" "}
						results
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						{isPreviousLink && (
							<Link
								href={previousLink}
								className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							>
								<span className="sr-only">Previous</span>
								<ChevronLeftIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</Link>
						)}
						{pages.map((page) => {
							switch (typeof page) {
								case "number":
									return (
										<PaginationItem
											baseUrl={baseUrl}
											page={page}
											key={page}
										/>
									);
								default:
									return <PaginationSeparator key={page} />;
							}
						})}

						{isNextLink && (
							<Link
								href={nextLink}
								className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							>
								<span className="sr-only">Next</span>
								<ChevronRightIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</Link>
						)}
					</nav>
				</div>
			</div>
		</div>
	);
}
