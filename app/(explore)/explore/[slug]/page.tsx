"use client";
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogDummyData } from "@/data/mock/blog";
import { UserProfile } from "../../../../components/shared";
import { ItemComment } from "../../../../components/shared/comments";
import { PostEngagement } from "../../../../components/shared/social/PostEngagement";
// import { CommentType } from "../../../../types/comment";

// type DOMComment = globalThis.Comment;
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BlogDummyData.find(
    (post) => post.title.toLowerCase().replace(/ /g, "-") === params.slug
  );

  if (!post) {
    notFound();
  }

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/posts/${params.slug}`
      : "";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center mb-6 border-b-6 border-dashed border-gray pb-4">
        <UserProfile user={post.user} />
      </div>
      <div className="border-b-2 border-dashed"></div>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-auto mt-6 mb-6 rounded-lg"
      />

      <div className="prose max-w-none mb-8">
        <p className="text-xl mb-4">{post.description}</p>
        {post.content.map((item, index) => {
          switch (item.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-4">
                  {item.text}
                </p>
              );
            case "subtitle":
              return (
                <h2 key={index} className="text-2xl font-bold mt-6 mb-4">
                  {item.text}
                </h2>
              );
            case "list":
              return (
                <ul key={index} className="list-disc pl-6 mb-4">
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))}
                </ul>
              );
            case "image-gallery":
              return (
                <div key={index}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {item.images.map((img, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={img}
                        alt={`Additional image ${imgIndex + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                  <p className="text-center text-gray-500 mb-8">
                    Business Week Image Gallery
                  </p>
                </div>
              );
          }
        })}
      </div>

      {post.tags && (
        <div className="flex flex-wrap p-2 bg-gray-500 gap-2">
          {post.tags.map((tag) => (
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
        postId={post.id ?? ""}
        postTitle={post.title}
        postUrl={postUrl}
        initialLikes={post.metrics.likesCount}
        initialComments={post.comments as ItemComment[]}
        initialCommentsCount={post.metrics.commentsCount}
        initialShares={post.metrics.sharesCount}
        onLike={() => {
          // Handle like analytics or API calls
        }}
        onComment={() => {
          // Handle comment analytics or API calls
        }}
        onShare={() => {
          // Handle share analytics or API calls
        }}
      />
      {/* <div className="flex items-center space-x-4 mb-4">
        <Comments
          postId={post.id ?? ""}
          initialComments={(post.comments as ItemComment[]) ?? []}
          initialCommentsCount={post.metrics.commentsCount}
        />
      </div> */}
    </article>
  );
}
