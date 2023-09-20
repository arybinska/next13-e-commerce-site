import { type ReactNode } from "react";

export const generateStaticParams = async () => {
	return [{ category: "boots" }, { category: "all" }];
};

export default function CategoryProductLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
