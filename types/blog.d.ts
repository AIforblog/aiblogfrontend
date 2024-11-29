// import type { z } from "zod";
// import type { PostMetrics } from "./post-metrics";
// import type { UserProps } from "./user";
// import type { createBlogSchema } from "@/schemas/blog";

// export type ContentItem =
// 	| { type: "paragraph" | "subtitle"; text: string }
// 	| { type: "list"; items: string[] }
// 	| { type: "image-gallery"; images: string[] };

// export interface BlogType {
// 	user: UserProps;
// 	id?: string;
// 	title: string;
// 	subtitle?: string;
// 	content: ContentItem[];
// 	additionalImages?: string[];
// 	tags?: string[];
// 	publishedDate?: string;
// 	description: string;
// 	image: string;
// 	metrics: PostMetrics;
// 	extra_info: string[];
// 	comments?: ItemComment[];
// }

// export type Blog = z.infer<typeof createBlogSchema>;

// types/blog.ts

import type { z } from "zod";
import type { createBlogSchema } from "@/schemas/blog";
import type { PostMetrics } from "./post-metrics";
import type { UserProps } from "./user";

export type ContentItem =
  | { type: "paragraph" | "subtitle"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image-gallery"; images: string[] };

export interface UserProps {
  username: string;
  profilePic: string;
  name: string;
  id: string;
  bio: string;
  externalLink: string;
  followersCount: number;
  followingCount: number;
  coverPhoto: string;
}

export interface BlogType {
  user: UserProps;
  id: string;
  title: string;
  subtitle?: string;
  bio?: string;
  externalLink?: string;
  followersCount?: number;
  followingCount?: number;
  coverPhoto?: string;
  content: sting | ContentItem[];
  additionalImages?: string[];
  tags?: string[];
  publishedDate?: string;
  description: string;
  blogContent?: string;
  image: string;
  metrics: PostMetrics;
  extra_info: string[];
  comments?: number | ItemComment[];
}

export type Blog = z.infer<typeof createBlogSchema>;

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  userId: string;
  tags: string[];
  username: string;
  firstName: string;
  profilePic: string | null;
  lastName: string;
  category: string;
  status: string;
  views: number;
  likes: number;
  comments: number;
  dislikes: number;
  thumbnail: string;
  publishedAt: string;
};

export type BlogResponse = {
  statusCode: number;
  message: string;
  data: {
    count: number;
    page: number;
    next: boolean;
    prev: boolean;
    results: BlogPost[];
  };
};

export type SingleBlogResponse = {
  statusCode: number;
  message: string;
  data: BlogPost;
};

export interface BlogUrlMapping {
  slug: string;
  id: string;
}
