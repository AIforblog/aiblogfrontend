import { PostMetrics } from "./post-metrics";
import { UserProps } from "./user";

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
