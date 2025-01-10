//aiblogfrontend\components\blog\blog-card.tsx
/* eslint-disable react/display-name */

"use client";
import { memo, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PostMetrics, UserProfile } from "../shared";
import type { BlogType } from "@/types/blog";
import Image from "next/image";
import BlogExtraInfo from "./blog-extra-info";
import { reactToPost } from "@/actions/socials";
import { generateSlug } from "@/lib/utils";
import he from "he";
import Link from "next/link";

interface MainBloyType {
  blog: BlogType;
  hasShadow?: boolean;
  hasBackground?: boolean;
  isFollowing?: boolean;
}

const BlogCard = memo<MainBloyType>(
  ({ blog, hasBackground, hasShadow, isFollowing }) => {
    // Clean and shorten content for preview
    const rawText = he.decode(
      (Array.isArray(blog.content)
        ? blog.content
            .map((item) => (typeof item === "string" ? item : item.text))
            .join(" ")
        : blog.content
      )?.replace(/<[^>]+>/g, ""),
    );
    const previewText =
      rawText.length > 100 ? `${rawText.slice(0, 200)}...` : rawText;
    const id = generateSlug(blog.id);
    const [isLiked, setIsLiked] = useState(blog.metrics.isLiked || false);
    const [likesCount, setLikesCount] = useState(blog.metrics.likesCount);

    useEffect(() => {
      // Store the mapping when component mounts
      sessionStorage.setItem(`blog-${id}`, blog.id);
    }, [blog.id, id]);

    if (!blog.id) {
      console.error("Blog ID is undefined");
      return null;
    }

    const handleLikeToggle = async () => {
      try {
        // Toggle the local like state and count
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

        // Call the API to like or unlike the post
        await reactToPost(blog.id);
      } catch (error) {
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
        throw error;
        // Revert state if API call fails
      }
    };

    return (
      <Link href={`/explore/${blog.id}`} suppressHydrationWarning>
        <Card
          className={`w-full flex flex-col gap-y-3 justify-between ${
            hasBackground
              ? "bg-secondary"
              : "bg-transparent border border-[#E5E5E5] dark:border-neutral-800"
          } ${hasBackground ? "mb-4" : "mb-4"}
       ${hasBackground ? "p-4" : "p-4"} ${
         hasShadow ? "bg-white" : "shadow-none"
       } rounded-xl`}
        >
          <CardHeader className="p-0 ">
            <UserProfile user={blog.user} isFollowing={isFollowing} />
          </CardHeader>

          <CardContent
            className="flex flex-col p-0 gap-y-3 relative justify-stretch grow  cursor-pointer !mt-2"
            // onClick={handleClick}
          >
            <CardTitle className="text-[1.2rem] font-semibold overflow-hidden capitalize leading-7 text-[#262626] dark:text-neutral-100">
              {blog.title}
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-[0.85rem] !mt-1 font-normal overflow-hidden line-clamp-[3] relative leading-6 text-[#737373] dark:text-neutral-300">
              {previewText}
            </CardDescription>

            {blog.image && (
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] md:max-h-[300px] md:min-h-[300px] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={`${blog.title} blog image`}
                  width={1000}
                  height={1000}
                  className="object-cover relative w-full h-full"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="p-0 flex flex-row items-center justify-between !mt-6">
            <PostMetrics
              item={{
                ...blog.metrics,
                isLiked,
                likesCount,
                commentsCount: blog.metrics.commentsCount,
                sharesCount: blog.metrics.sharesCount,
                onLike: handleLikeToggle,
              }}
            />

            <BlogExtraInfo items={blog.extra_info} />
          </CardFooter>
        </Card>
      </Link>
    );
  },
);

export default BlogCard;
