"use client";

import Link from "next/link";
import clsx from "clsx";
import { PRODUCTS_PER_PAGE } from "../../api/products";

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	pageNumber: string;
	allProducts: number;
}

export const PaginationControls = ({
	hasNextPage,
	hasPrevPage,
	pageNumber,
	allProducts,
}: PaginationControlsProps) => {
	const page = Number(pageNumber);
	const productsPerPage = PRODUCTS_PER_PAGE;
	return (
		<div className="mx-auto mb-5 max-w-sm">
			<div
				aria-label="pagination"
				className="flex items-center justify-center gap-3"
			>
				<Link
					className={clsx(
						`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180`,
						!hasPrevPage && "cursor-not-allowed",
					)}
					href={`/products/${page - 1}`}
				>
					<span className="sr-only">Next Page</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-3 w-3"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
				<p className="text-xs text-gray-900">
					{page}
					<span className="mx-0.25">/</span>
					{Math.ceil(allProducts / productsPerPage)}
				</p>
				<Link
					className={clsx(
						`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180`,
						!hasNextPage && "cursor-not-allowed",
					)}
					href={`/products/${page + 1}`}
				>
					<span className="sr-only">Next Page</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-3 w-3"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
};
