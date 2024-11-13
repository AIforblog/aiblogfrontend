//aiblogfrontend\hooks\useBlogPost.ts
import { getBlogPost } from "@/actions/getBlogs";
import type { BlogPost } from "@/types/blog";

export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await getBlogPost(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
