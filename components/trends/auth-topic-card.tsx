// Authenticated user topic card

/* eslint-disable react/display-name */
import { memo } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Ellipsis } from "lucide-react";
import { formatViews } from "@/lib/utils";

interface RelatedTopics {
  topic: string;
  num_posts?: number;
}

interface AuthTopicCard {
  topic: string;
  sub_topic?: string;
  related_topics?: RelatedTopics[];
}

function SubTopicCard({ topic, num_posts }: RelatedTopics): JSX.Element {
  return (
    <div className="flex justify-between gap-x-3">
      <div className="flex-1 gap-1">
        <h2 className="w-fit text-[#171717] dark:text-neutral-200 hover:text-[#525252] dark:hover:text-neutral-300 font-semibold text-base hover:cursor-pointer transition duration-300 ease-in-out">
          {topic}
        </h2>
        <p className="w-fit text-[#525252] dark:text-neutral-400 font-normal text-sm hover:cursor-pointer">
          {formatViews(num_posts || 0)} posts
        </p>
      </div>

      <Ellipsis
        size={20}
        className="mt-2 hover:cursor-pointer transition duration-300 text-[#525252] dark:text-neutral-400 ease-in-out"
      />
    </div>
  );
}

const AuthTopicCard = memo<{ item: AuthTopicCard }>(({ item }) => {
  return (
    <Card className="w-full p-3 flex flex-col gap-y-[0.9rem] border rounded-xl bg-transparent shadow-none border-[#E5E5E5] dark:border-neutral-800">
      <CardHeader className="p-0">
        <div className="flex flex-row items-center gap-x-[6px]">
          <h2 className="text-base text-[#525252] dark:text-neutral-100 font-semibold capitalize">
            {item.topic}
          </h2>
          <div className="w-[6px] h-[6px] rounded-full bg-[#a3a3a3]" />
          <h4 className="text-sm text-[#525252] dark:text-neutral-300 font-normal capitalize">
            {item.sub_topic}
          </h4>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-y-3">
        {item.related_topics?.map((topic, index) => (
          <div key={index}>
            <SubTopicCard key={index} {...topic} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

export default AuthTopicCard;
