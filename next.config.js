/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		domains: ["tailwindui.com", "naszsklep-api.vercel.app"],
		formats: ["image/avif", "image/webp"],
	},
	redirects: async () => [
		{
			source: "/products",
			destination: "/products/1",
			permanent: true,
		},
	],
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
