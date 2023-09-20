import { notFound } from "next/navigation";
import { ComponentType } from "react";

export default async function StaticPage({
	params,
}: {
	params: { filename: string };
}) {
	const Page = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
		() => notFound(),
	);
	return (
		<article className="prose prose-lg mx-auto my-10 text-center">
			<Page />
		</article>
	);
}