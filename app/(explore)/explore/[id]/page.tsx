//app\(explore)\explore\[id]\page.tsx

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserProfile } from "@/components/shared";
// import { ItemComment } from "@/components/shared/comments";
import { PostEngagement } from "@/components/shared/social/PostEngagement";
import { fetchBlogPost } from "@/hooks/useBlogPost";
import { CheckFollowing } from "@/actions/follow";
import { assertUserAuthenticated } from "@/lib/auth";
import { titleCase, timeSince } from "@/lib/utils";
import { getComments } from "@/actions/socials";

// import type { BlogPost } from "@/types/blog";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchBlogPost(params.id);
  const comments = await getComments(params.id);
  console.log(comments);
  
  const user = await assertUserAuthenticated();

  const isFollowing = await CheckFollowing(
    user.accessToken.value as string,
    post?.userId as string
  );
  //  const isFollowsYou= await checkFollowedBy(user.accessToken.value as string, post?.userId as string);

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
    <article className="px-12 py-8 max-md:px-4">
      <h1 className="text-xl font-semibold opacity-90">
        {titleCase(post.title)}
      </h1>
      <span className="text-[0.78rem] opacity-65">{timeSince(post.publishedAt)}</span>

      <div className="flex items-center mt-4 mb-6 pb-4">
        <UserProfile
          user={{
            username: post.username,
            profilePic: "/default-profile-avatar.webp", // Add a default avatar
            name: post.username,
            id: post.id,
            userId: post?.userId,
            followersCount: 0,
            followingCount: 0,
            bio: "",
            externalLink: "",
            coverPhoto: "",
          }}
          isFollowing={isFollowing}
        />
      </div>

      {/* Separator */}

      <hr />

      {/* Post thumbnail */}

      <Image
        src={post.thumbnail}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-auto mt-6 mb-6 rounded-lg"
      />

      <div className="prose max-w-none mb-8 text-sm">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Post tags */}

      {post.tags && (
        <div className="flex flex-wrap p-2 bg-gray-500 gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className=" px-4 py-2 rounded-full text-xs bg-yellow-200 text-black"
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
        initialComments={comments} // You'll need to implement comments fetching
        initialCommentsCount={post.comments}
        initialShares={0}
        isFollowing={isFollowing}
      />
    </article>
  );
}
