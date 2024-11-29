"use client";

import { formatViews } from "@/lib/utils";
/* eslint-disable react/display-name */
import { PostMetrics as PostMetricsInterface } from "@/types/post-metrics";
import { MessagesSquare, Share2, ThumbsUp } from "lucide-react";
import { memo } from "react";

/**
 * Props for the PostMetrics component.
 */
interface PostMetricsProps extends PostMetricsInterface {
  /** Callback function to handle metric functionalities */
  isLiked?: boolean;
  onLike?: () => Promise<void>;
  onComment?: (() => void) | undefined;
  onShare?: (() => void) | undefined;
}

/**
 * Props for the MetricsItem component.
 */
interface MetricsItemProps {
  icon: JSX.Element;
  count: number;
  onIconClick: () => void;
}

export const MetricsItem = ({ icon, count, onIconClick }: MetricsItemProps) => {
  return (
    <div
      className="flex flex-row items-center gap-x-1 cursor-pointer"
      onClick={onIconClick}
    >
      {icon}
      <p className="font-medium text-[#525252] dark:text-neutral-300 text-sm leading-none">
        {formatViews(count)}
      </p>
    </div>
  );
};

/**
 * Component to display post metrics (likes, comments, shares).
 */
const PostMetrics = memo<{ item: PostMetricsProps }>(({ item }) => {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <MetricsItem
        icon={
          <ThumbsUp
            className="size-4"
            color={item.isLiked ? "black" : "#A3A3A3"}
            fill={item.isLiked ? "black" : "none"}
          />
        }
        count={item.likesCount}
        onIconClick={() => {
          item.onLike?.();
        }}
      />
      <MetricsItem
        icon={<MessagesSquare className="size-4" color="#A3A3A3" />}
        count={item.commentsCount}
        onIconClick={() => item.onComment}
      />
      <MetricsItem
        icon={<Share2 className="size-4" color="#A3A3A3" />}
        count={item.sharesCount}
        onIconClick={() => item.onShare}
      />
    </div>
  );
});

export default PostMetrics;
