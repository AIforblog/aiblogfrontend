import { BlogCard } from "@/components/blog";
import React from "react";
import { CheckFollowing } from "@/actions/follow";

import { assertUserAuthenticated } from "@/lib/auth";
import { getBlogs } from "../../../actions/getBlogs";

import { BlogPost } from "@/types/blog";
import { User } from "@/types/auth";
import Link from "next/link";

const Home = async () => {
  let user: { accessToken: any; userId?: string | undefined; user?: User },
    initialBlog;

  try {
    user = await assertUserAuthenticated();
  } catch (error) {
    console.error("User authentication failed:", error);
    // return <div>Error: Failed to authenticate user.</div>;
  }

  try {
    const [blogResponse] = await Promise.all([getBlogs({ page: 1 })]);
    initialBlog = blogResponse.data.results;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error: Failed to load blogs or categories.</div>;
  }

  // Check following status for each blog's writer
  try {
    const followStatus = await Promise.all(
      initialBlog.map(async (blog: BlogPost) => {
        const isFollowing = await CheckFollowing(
          user.accessToken.value as string,
          blog.userId,
        );
        console.log(isFollowing, "hello world");
        return { ...blog, isFollowing };
      }),
    );
    initialBlog = followStatus; // Update blogs with follow status
  } catch (error) {
    console.error("Failed to check following status:", error);
    // Fallback to default `isFollowing: false`
    initialBlog = initialBlog.map((blog: BlogPost) => ({
      ...blog,
      isFollowing: false,
    }));
  }

  return (
    <div className="containerHeight overflow-scroll custom-scroll">
      {initialBlog.map((blog: BlogPost) => (
        <Link href={`/explore/${blog.id}`} key={blog.id}>
          <BlogCard
            hasBackground={true}
            isFollowing={blog.isFollowing}
            blog={{
              ...blog,
              image: blog.thumbnail,
              description: blog.content.slice(0, 100) + "...", // Default short description
              blogContent: blog.content, // Full content if needed
              extra_info: [], // Add an empty array as a default for extra_info
              user: {
                username: blog.username,
                profilePic: blog.profilePic || "/default-profile-avatar.webp",
                name: blog.firstName
                  ? `${blog.firstName} ${blog.lastName}`
                  : blog.username,
                id: blog.userId,
                bio: "", // Add default values
                externalLink: "",
                followersCount: 0,
                followingCount: 0,
                coverPhoto: "/default-cover.jpg",
                userId: blog.userId,
              },
              metrics: {
                likesCount: blog.likes,
                commentsCount: blog.comments,
                sharesCount: blog.views,
              },
            }}
          />
        </Link>
      ))}
      {/* <div className="h-[1px] mb-6 w-full bg-[#E5E5E5] dark:bg-neutral-800" /> */}
    </div>
  );
};

export default Home;
