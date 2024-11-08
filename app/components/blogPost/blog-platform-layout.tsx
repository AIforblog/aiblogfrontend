//aiblogfrontend\app\components\blogPost\blog-platform-layout.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Home, Briefcase, User } from "lucide-react";
import { BlogCard } from "@/components/blog";
import { SearchInput } from "@/components/shared";
import { CategoryItem } from "@/components/shared/category";
import { cn, generateSlug } from "@/lib/utils";
import { getBlogs } from "../../../actions/getBlogs";
import type { BlogPost } from "@/types/blog";

export default function BlogPlatformLayout() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Politics",
    "Flutter",
    "Nigeria",
    "AWS",
    "Crypto",
    "5G Connectivity",
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBlogs(1, false, "");
      const blogData = response.data.results;

      // Store blog posts in state
      setBlogs(blogData);
      blogData.forEach((blog: BlogPost) => {
        const slug = generateSlug(blog.id);
        sessionStorage.setItem(`blog-${slug}`, blog.id);
      });

      setError(null);
    } catch (error) {
      setError("Failed to load blogs. Please try again later.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await getBlogs(1, false, searchTerm);
      setBlogs(response.data.results);
    } catch (error) {
      setError("Search failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full relative max-w-[1440px] mx-auto px-4">
      <div className="md:hidden mb-4">
        <SearchInput placeholder="Find blogs..." onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">CATEGORY</h2>
        <div className="flex space-x-2 overflow-x-auto custom-scroll pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              className={cn(
                "bg-[#f9f7b9]/30 hover:bg-[#f9f7b9] rounded-[20px]",
                category === currentCategory && "bg-black"
              )}
              variant={category === currentCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <CategoryItem />

      <div className="flex flex-wrap -mx-4 w-full mb-12">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>

          {loading && (
            <div className="text-center">
              <div className="flex items-center justify-center min-h-screen ">
                <div
                  aria-label="Loading..."
                  role="status"
                  className="flex items-center space-x-2"
                >
                  <svg
                    className="h-20 w-20 animate-spin stroke-[#9e9e9e]"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span className="text-4xl font-medium text-gray-500">
                    Loading Blogs
                  </span>
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {blogs.map((blog: BlogPost) => (
              <BlogCard
                key={blog.id}
                blog={{
                  ...blog,
                  image: blog.thumbnail,
                  description: blog.content.slice(0, 100) + "...", // Default short description
                  blogContent: blog.content, // Full content if needed
                  extra_info: [], // Add an empty array as a default for extra_info
                  user: {
                    username: blog.userId,
                    profilePic: "/default-avatar.png",
                    name: blog.userId,
                    id: blog.userId,
                    bio: "", // Add default values
                    externalLink: "",
                    followersCount: 0,
                    followingCount: 0,
                    coverPhoto: "/default-cover.jpg",
                  },
                  metrics: {
                    likesCount: blog.likes,
                    commentsCount: blog.comments,
                    sharesCount: blog.views,
                  },
                }}
                hasBackground
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0  bg-white border-t md:hidden mb-6">
        <div className="flex justify-around py-2">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Briefcase className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
