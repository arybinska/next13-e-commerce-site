import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-xl">Page not found</p>
			<Link href="/" className="text-blue-600 hover:underline">
				Go back to home
			</Link>
		</div>
	);
}
