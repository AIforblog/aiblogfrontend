import { ArticleCard } from "@/components/article";
import { ArticleData } from "@/data/mock/article";

const FeaturedArticles = () => {
	return (
		<div className="">
			<div className="containerHeight overflow-scroll custom-scroll pr-2 pt-2">
				{ArticleData.map((item, index) => (
					<ArticleCard key={index} article={item} />
				))}
			</div>
		</div>
	);
};

export default FeaturedArticles;
