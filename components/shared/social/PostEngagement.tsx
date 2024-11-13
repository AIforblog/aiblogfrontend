"use client";
import { useState } from "react";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { ShareButton } from "./ShareButton";
import Comments from "../comments";
import type { ItemComment } from "@/types/comment";
import { cn } from "@/lib/utils";

interface PostEngagementProps {
  postId: string;
  postTitle: string;
  postUrl: string;
  initialLikes: number;
  initialComments: ItemComment[];
  initialCommentsCount: number;
  initialShares: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const PostEngagement = ({
  postId,
  postTitle,
  postUrl,
  initialLikes,
  initialComments,
  initialCommentsCount,
  initialShares,
  onLike,
  onComment,
  onShare,
}: PostEngagementProps) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [currentCommentsCount, setCurrentCommentsCount] =
    useState(initialCommentsCount);

  const handleToggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
    onComment?.();
  };

  const handleCommentCountUpdate = (newCount: number) => {
    setCurrentCommentsCount(newCount);
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className="transform transition-all duration-200 hover:scale-105">
          <LikeButton initialLikes={initialLikes} onLike={onLike} />
        </div>

        <div className="transform transition-all duration-200 hover:scale-105">
          <CommentButton
            commentsCount={initialCommentsCount}
            onClick={handleToggleComments}
          />
        </div>

        <div className="transform transition-all duration-200 hover:scale-105">
          <ShareButton
            initialShares={initialShares}
            postTitle={postTitle}
            postUrl={postUrl}
            onShare={onShare}
          />
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCommentsOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        )}
      >
        {isCommentsOpen && (
          <div className="mt-4 rounded-xl p-4 w-full">
            <Comments
              postId={postId}
              initialComments={initialComments}
              initialCommentsCount={currentCommentsCount}
              onCommentCountChange={handleCommentCountUpdate}
              isOpen={isCommentsOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};
