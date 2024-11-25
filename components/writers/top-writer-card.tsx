/* eslint-disable react/display-name */
import { memo } from "react";
import { PostMetrics, UserProfile } from "../shared";
import type { UserProps } from "@/types/user";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import type { PostMetrics as PostMetricsProps } from "@/types/post-metrics";

/**
 * Interface representing the properties of a top writer.
 */
export interface TopWriterProps {
  user: UserProps;
  userId: string;
  topic: string;
  metrics: PostMetricsProps;
}

const TopWriterCard = memo<{ item: TopWriterProps }>(({ item }) => {
  return (
    <Card className="w-full p-3 flex flex-col gap-y-[0.9rem] border rounded-xl bg-transparent shadow-none border-[#E5E5E5] dark:border-neutral-800">
      <CardHeader className="p-0">
        <UserProfile user={item.user} />
      </CardHeader>

      <CardContent className="p-0">
        <h2 className="text-base text-[#525252] dark:text-neutral-200 font-semibold capitalize w-[96%] line-clamp-2">
          {item.topic}
        </h2>
      </CardContent>

      <CardFooter className="p-0">
        <PostMetrics item={item.metrics} />
      </CardFooter>
    </Card>
  );
});

export default TopWriterCard;
