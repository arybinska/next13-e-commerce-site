export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price / 100);
};

export const getPaginationItems = (
	numberOfPages: number,
	currentPage: number,
) => {
	const pages = [];

	for (let i = 1; i <= numberOfPages; i++) {
		pages.push(i);
	}
	const firstPages = pages.slice(0, 2);
	const lastPages = pages.slice(-2);
	const currentPageIndex = pages.indexOf(currentPage);
	const closePagesToCurrentPage = pages.slice(
		currentPageIndex - 1,
		currentPageIndex + 2,
	);

	const pageList = [
		...new Set([
			...firstPages,
			...closePagesToCurrentPage,
			...lastPages,
		]),
	];

	const paginationItems: (string | number)[] = [];

	pageList.forEach((page, index) => {
		paginationItems.push(page);
		if (pageList[index + 1] && page + 1 !== pageList[index + 1]) {
			paginationItems.push("page");
		}
		return page;
	});

	return paginationItems;
};
