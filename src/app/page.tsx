import { SuggestedProductsList } from "../ui/organisms/SuggestedProducts";
import { HomepageSection } from "../ui/atoms/HomepageSection";

export default function HomePage() {
	return (
		<>
			<HomepageSection />
			<aside className="border-y-4 p-10">
				<SuggestedProductsList />
			</aside>
		</>
	);
}
