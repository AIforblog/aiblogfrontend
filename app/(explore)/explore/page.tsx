import { CheckFollowing } from "@/actions/follow";
import BlogPlatformLayout from "@/app/components/blogPost/blog-platform-layout";
import { assertUserAuthenticated } from "@/lib/auth";
import { getBlogs } from "../../../actions/getBlogs";
import { getCategories } from "@/actions/categories";
import { BlogPost } from "@/types/blog";
import { User } from "@/types/auth";

export default async function BlogPage() {
  let user: { accessToken: any; userId?: string | undefined; user?: User },
    initialBlog,
    category;

  try {
    user = await assertUserAuthenticated();
  } catch (error) {
    console.error("User authentication failed:", error);
    // return <div>Error: Failed to authenticate user.</div>;
  }

  try {
    const [blogResponse, categoryResponse] = await Promise.all([
      getBlogs({ page: 1 }),
      getCategories(),
    ]);
    initialBlog = blogResponse.data.results;
    category = categoryResponse.data;
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

  return <BlogPlatformLayout initialBlog={initialBlog} category={category} />;
}
