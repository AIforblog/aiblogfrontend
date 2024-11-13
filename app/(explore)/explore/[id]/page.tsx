//app\(explore)\explore\[id]\page.tsx

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserProfile } from "@/components/shared";
// import { ItemComment } from "@/components/shared/comments";
import { PostEngagement } from "@/components/shared/social/PostEngagement";
import { fetchBlogPost } from "@/hooks/useBlogPost";
// import type { BlogPost } from "@/types/blog";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchBlogPost(params.id);

  if (!post) {
    return notFound();
  }

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/explore/${post.title
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      : "";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center mb-6 border-b-6 border-dashed border-gray pb-4">
        <UserProfile
          user={{
            username: post.username,
            profilePic: "/default-avatar.png", // Add a default avatar
            name: post.username,
            id: post.id,
          }}
        />
      </div>

      <div className="border-b-2 border-dashed"></div>

      <Image
        src={post.thumbnail}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-auto mt-6 mb-6 rounded-lg"
      />

      <div className="prose max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {post.tags && (
        <div className="flex flex-wrap p-2 bg-gray-500 gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-[#E5E7EB] text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <PostEngagement
        postId={post.id}
        postTitle={post.title}
        postUrl={postUrl}
        initialLikes={post.likes}
        initialComments={[]} // You'll need to implement comments fetching
        initialCommentsCount={post.comments}
        initialShares={0}
      />
    </article>
  );
}
