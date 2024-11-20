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
import { fetchBlogPost } from "@/hooks/useBlogPost";
import he from "he";
import { useRouter } from "next/navigation";

interface MainBloyType {
  blog: BlogType;
  hasShadow?: boolean;
  hasBackground?: boolean;
}

const BlogCard = memo<MainBloyType>(({ blog, hasBackground, hasShadow }) => {
  // Clean and shorten content for preview
  const rawText = he.decode(
    (Array.isArray(blog.content)
      ? blog.content
          .map((item) => (typeof item === "string" ? item : item.text))
          .join(" ")
      : blog.content
    ).replace(/<[^>]+>/g, "")
  );
  const previewText =
    rawText.length > 100 ? `${rawText.slice(0, 200)}...` : rawText;
  const id = generateSlug(blog.id);
  const [isLiked, setIsLiked] = useState(blog.metrics.isLiked || false);
  const [likesCount, setLikesCount] = useState(blog.metrics.likesCount);
  const router = useRouter();
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

  const handleClick = async () => {
    const post = await fetchBlogPost(id);
    console.log("BlogCard: Blog post fetched:", post);
    router.push(`/explore/${blog.id}`);
  };

  return (
    <Card
      className={`w-full  flex flex-col gap-y-3 border-none ${
        hasBackground ? "bg-white" : "bg-transparent"
      } ${hasBackground ? "mb-0" : "mb-6"}
       ${hasBackground ? "p-4" : "p-0"} ${
        hasShadow ? "bg-white" : "shadow-none"
      } rounded-xl`}
    >
      <CardHeader className="p-0">
        <UserProfile user={blog.user} />
      </CardHeader>

      <CardContent
        className="flex flex-col p-0 gap-y-3 cursor-pointer"
        onClick={handleClick}
      >
        <CardTitle className="text-xl font-semibold capitalize leading-7 text-[#262626] dark:text-neutral-100">
          {blog.title}
        </CardTitle>

        {/* Description */}
        <CardDescription className="text-base font-normal leading-6 text-[#737373] dark:text-neutral-300">
          {previewText}
        </CardDescription>

        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-xl overflow-hidden">
          <Image
            src={blog.image || "/default-blog-image.jpg"}
            alt={`${blog.title} blog image`}
            width={1000}
            height={1000}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </CardContent>

      <CardFooter className="p-0 flex flex-row items-center justify-between">
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
  );
});

export default BlogCard;
