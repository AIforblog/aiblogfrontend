import React from "react";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "../blog";
import { UserProps } from "@/types/user";

function Posts({
  blogs = [],
  user,
  isFollowing,
}: {
  blogs: BlogPost[];
  user: UserProps;
  isFollowing?: boolean;
}) {
  return (
    <div>
      <div className=" gap-6">
        {blogs.map((blog: BlogPost) => (
          <BlogCard
            key={blog.id}
            blog={{
              ...blog,
              image: blog.thumbnail,
              description: blog.content.slice(0, 100) + "...",
              blogContent: blog.content,
              extra_info: [],
              user: {
                username: user.username,
                profilePic: user.profilePic || "/default-avatar.png",
                name: user.firstName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username,
                id: user.userId,
                bio: "",
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
            isFollowing={isFollowing}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
