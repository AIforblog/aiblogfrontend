import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogType } from "@/types/blog";
import Image from "next/image";
import ProfileCard from "@/components/shared/user-profile-card";

const FeaturedArticles = ({ articles }: { articles: BlogType[] }) => {
  return (
    <aside className="px-2 py-7 top-[100px] sticky bg-white max-w-[500px] lg:min-w-[304px] min-h-dvh">
      <h3 className="font-dm-sans font-medium text-2xl mb-7 text-[#171717]">
        Featured Articles
      </h3>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </aside>
  );
};

const ArticleCard = ({ article }: { article: BlogType }) => {
  return (
    <Card className="p-2 border-l-transparent border-r-transparent border-t-transparent rounded-none shadow-none gap-4 flex flex-col font-dm-sans text-[text-[#262626]] pb-5 border-b border-b-[#E5E5E5]">
      <CardHeader className="p-0">
        <ProfileCard user={article.user} />
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative block w-full h-[191px]">
          <Image
            src={article.image}
            alt={`${article.title} Blog image`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            // sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <CardTitle className="font-bold leading-8 scroll-m-20">
          {article.title}
        </CardTitle>
        <p className="font-medium">{article.description}</p>
      </CardFooter>
    </Card>
  );
};

export default FeaturedArticles;
