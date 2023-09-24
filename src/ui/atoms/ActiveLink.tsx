"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";
export const ActiveLink = ({
	href,
	children,
}: {
	href: Route | `/products/${number}`;
	children: ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={clsx(
				`text-gray-500 transition hover:text-gray-500/75`,
				isActive && `border-b-black text-teal-500`,
			)}
		>
			{children}
		</Link>
	);
};
