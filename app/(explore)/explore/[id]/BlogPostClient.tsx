"use client"

import { useEffect } from "react"
import Image from "next/image"
import { UserProfile } from "@/components/shared"
import { PostEngagement } from "@/components/shared/social/PostEngagement"
import { titleCase, timeSince } from "@/lib/utils"
import { useCommentsContext } from "@/context/commentsContext"
import type { ItemComment } from "@/types/comment"
import type {BlogPost } from "@/types/blog"

interface BlogPostClientProps {
  post: BlogPost;
  initialComments: ItemComment[];
  isFollowing: boolean;
  postUrl: string;
}

export default function BlogPostClient({ post, initialComments, isFollowing, postUrl }: BlogPostClientProps) {
  const { comments, setComments, fetchComments } = useCommentsContext()

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments, setComments])

  useEffect(() => {
    fetchComments(post.id)
  }, [post.id, fetchComments])


  return (
    <article className="px-12 py-8 max-md:px-4">
      <h1 className="text-xl font-semibold opacity-90">{titleCase(post.title)}</h1>
      <span className="text-[0.78rem] opacity-65">{timeSince(post.publishedAt)}</span>

      <div className="flex items-center mt-4 mb-6 pb-4">
        <UserProfile
          user={{
            username: post.username,
            profilePic: "/default-profile-avatar.webp",
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

      <hr />

      <Image
        src={post.thumbnail || "/placeholder.svg"}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-auto mt-6 mb-6 rounded-lg"
      />

      <div className="prose max-w-none mb-8 text-sm">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {post.tags && (
        <div className="flex flex-wrap p-2 bg-gray-500 gap-2">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="px-4 py-2 rounded-full text-xs bg-yellow-200 text-black">
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
        initialComments={comments || []}
        initialCommentsCount={post.comments}
        initialShares={0}
        isFollowing={isFollowing}
      />
    </article>
  )
}

