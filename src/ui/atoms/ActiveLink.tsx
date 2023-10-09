"use client";
import { type UrlObject } from "url";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";

export const ActiveLink = <T extends string>({
	href,
	children,
	exact,
	className,
	activeClassName,
}: {
	href: Route<T> | UrlObject;
	children: ReactNode;
	exact?: boolean;
	className?: string;
	activeClassName?: string;
}) => {
	const pathname = usePathname();
	const stringPathname =
		typeof href === "object" ? href.pathname || "" : href;
	const isActive = exact
		? pathname === stringPathname
		: pathname.includes(stringPathname);
	const activeClass = activeClassName ? activeClassName : "";
	const inactiveClass = className ? className : "";
	const linkClassName = clsx({
		[activeClass]: isActive,
		[inactiveClass]: !isActive,
	});
	return (
		<Link
			href={href}
			className={linkClassName}
			aria-current={isActive ? "page" : undefined}
		>
			{children}
		</Link>
	);
};
