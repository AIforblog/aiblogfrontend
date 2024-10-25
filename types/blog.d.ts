import type { z } from "zod";
import type { PostMetrics } from "./post-metrics";
import type { UserProps } from "./user";
import type { createBlogSchema } from "@/schemas/blog";

export type ContentItem =
	| { type: "paragraph" | "subtitle"; text: string }
	| { type: "list"; items: string[] }
	| { type: "image-gallery"; images: string[] };

export interface BlogType {
	user: UserProps;
	id?: string;
	title: string;
	subtitle?: string;
	content: ContentItem[];
	additionalImages?: string[];
	tags?: string[];
	publishedDate?: string;
	description: string;
	image: string;
	metrics: PostMetrics;
	extra_info: string[];
	comments?: ItemComment[];
}

export type Blog = z.infer<typeof createBlogSchema>;
