export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "boots") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "3" }, { pageNumber: "4" }];
	}
};

export default function SingleCategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	return (
		<h1>
			Produkty z kategorii {params.category}, strona{" "}
			{params.pageNumber}
		</h1>
	);
}
