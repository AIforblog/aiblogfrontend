import RelatedTask from "@/app/components/related-task";
import { ArticleCard as FeaturedArticleCard } from "@/components/article";
import ProfileCard from "@/components/shared/user-profile-card";
import { Separator } from "@/components/ui/separator";
import { ArticleData } from "@/data/mock/article";
import { JobDummyData } from "@/data/mock/job";
import { UserData } from "@/data/mock/user";
import iconComment from "@/public/assets/icons/comment.svg";
import iconShare from "@/public/assets/icons/share.svg";
import { ThumbsUpIcon } from "lucide-react";
import Image from "next/image";

const Aside = () => {
  const job = JobDummyData[0];
  return (
    <div className="hidden w-1/3 max-w-[400px] lg:block flex-shrink-0 overflow-y-auto max-h-full custom-scroll pb-[115px]">
      <ClientsSection />

      <Separator className="my-[34px] bg-neutral-200" />

      <div className="space-y-5">
        <RelatedTask job={job} />
        <RelatedTask job={job} />
      </div>

      <Separator className="my-[34px] bg-neutral-200" />

      <div className="space-y-3">
        <h3 className="text-2xl font-medium">
          {UserData.username}&apos;s -{" "}
          <span className="text-neutral-500">articles</span>
        </h3>
        {ArticleData.slice(0, 3).map((article) => (
          <FeaturedArticleCard article={article} key={article.title} />
        ))}
      </div>
    </div>
  );
};

const ClientsSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold leading[1.4] mb-5">Clients</h3>
      <ProfileCard user={UserData} />
      <p className="text-2xl font-semibold leading-[1.4]">
        Tesla’s AI-Powered Transformation In Electric Vehicles
      </p>
      <div className="text-sm text-neutral-500 leading-[1.36] gap-1 flex items-center mt-3">
        <p>Jan 03, 2024</p>
        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
        <p>Wed, 05:48</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-2 py-1 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
          <ThumbsUpIcon className="w-5 h-5" />
          <span className="leading-none">1.5K</span>
        </button>

        <button className="px-2 py-1 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
          <Image src={iconComment} width={20} height={20} alt="" />
          <span className="leading-none">3.5K</span>
        </button>

        <button className="px-2 py-1 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
          <Image src={iconShare} width={20} height={20} alt="" />
          <span className="leading-none">5K</span>
        </button>
      </div>
    </div>
  );
};

export default Aside;
