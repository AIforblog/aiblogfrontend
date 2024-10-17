/* eslint-disable react/display-name */
import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PostMetrics, UserProfile } from "../shared";
import { BlogType } from "@/types/blog";
import Image from "next/image";
import BlogExtraInfo from "./blog-extra-info";
import Link from "next/link";


interface MainBloyType {
  blog: BlogType;
  hasShadow?: boolean;
  hasBackground?: boolean;
}

const BlogCard = memo<MainBloyType>(({ blog, hasBackground, hasShadow }) => {
  return (
    <Link
      href={`/explore/${encodeURIComponent(
        blog.title.toLowerCase().replace(/ /g, "-")
      )}`}
      className="block"
    >
      <Card
        className={`w-full flex flex-col gap-y-3 border-none ${
          hasBackground ? "bg-white" : "bg-transparent"
        } ${hasBackground ? "mb-0" : "mb-6"}
       ${hasBackground ? "p-4" : "p-0"} ${
          hasShadow ? "bg-white" : "shadow-none"
        } rounded-xl`}
      >
        <CardHeader className="p-0">
          <UserProfile user={blog.user} />
        </CardHeader>

        <CardContent className="flex flex-col p-0 gap-y-3">
          <CardTitle className="text-xl font-semibold capitalize leading-7 text-[#262626] ">
            {blog.title}
          </CardTitle>

          {/* Description */}
          <CardDescription className="text-base font-normal leading-6 text-[#737373]">
            {blog.description}
          </CardDescription>

          <div className="relative block rounded-xl w-full h-[230px] my-3 overflow-hidden">
            <Image
              src={blog.image}
              alt={`${blog.title} blog image`}
              width={1000}
              height={1000}
              objectFit="cover"
            />
          </div>
        </CardContent>

        <CardFooter className="p-0 flex flex-row items-center justify-between">
          <PostMetrics
            item={blog.metrics}
            key={blog.user?.username + blog.title}
          />

          <BlogExtraInfo items={blog.extra_info} />
        </CardFooter>
      </Card>
    </Link>
  );
});

export default BlogCard;
