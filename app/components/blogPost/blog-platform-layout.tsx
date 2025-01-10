//aiblogfrontend\app\components\blogPost\blog-platform-layout.tsx
"use client";

import { BlogCard } from "@/components/blog";
import { SearchInput } from "@/components/shared";
import { CategoryItem } from "@/components/shared/category";
import { Button } from "@/components/ui/button";
import { cn, generateSlug } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";
import { Category } from "@/types/categories";
import { Briefcase, Home, MessageCircle, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogs } from "../../../actions/getBlogs";
import Link from "next/link";

export default function BlogPlatformLayout({
  initialBlog,
  category,
}: {
  initialBlog: BlogPost[];
  category: Category[];
}) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlog);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchBlogs({ category: currentCategory?.name });
  }, [currentCategory?.name]);

  console.log(category, "erth");

  const fetchBlogs = async (params?: { category?: string; page?: number }) => {
    try {
      const response = await getBlogs(params || {});
      const blogData = response.data.results;
      console.log(blogData);
      // Store blog posts in state
      setBlogs(blogData);
      blogData.forEach((blog: BlogPost) => {
        const slug = generateSlug(blog.id);
        sessionStorage.setItem(`blog-${slug}`, blog.id);
      });
    } catch (error) {
      throw error;
    } finally {
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     setIsCategoriesLoading(true);
  //     const response = await getCategories();
  //     const categoriesData = response.data;

  //     setCategories(categoriesData);
  //     setCategoryError(null);
  //   } catch (error) {
  //     setError("Failed to load categories. Please try again later.");
  //     throw error;
  //   } finally {
  //     setIsCategoriesLoading(false);
  //   }
  // };

  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await getBlogs({ search: searchTerm });
      setBlogs(response.data.results);
    } catch (error) {
      throw error;
    } finally {
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black w-full relative px-6 pt-6">
      <div className="md:hidden mb-4">
        <SearchInput placeholder="Find blogs..." onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">CATEGORY</h2>
        <div className="flex space-x-2 overflow-x-auto custom-scroll pb-2">
          {/* {isCategoriesLoading && (
            <div className="w-full p-1 grid place-items-center">
              <Loader2Icon className="animate-spin" />
            </div>
          )} */}
          {/* {categoryError && <p className="text-destructive text-sm">{categoryError}</p>} */}

          <Button
            className={cn(
              "bg-[#f9f7b9]/30 hover:bg-[#f9f7b9] rounded-[20px]",
              currentCategory === null && "bg-black hover:bg-black/80",
            )}
            variant={currentCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentCategory(null)}
          >
            All
          </Button>
          {category.map((category) => (
            <Button
              key={category.id}
              className={cn(
                "bg-[#f9f7b9]/30 hover:bg-[#f9f7b9] dark:text-neutral-500 dark:bg-transparent dark:border-neutral-800 rounded-[20px] capitalize",
                category.id === currentCategory?.id &&
                  "bg-black hover:bg-black/80 dark:bg-neutral-800 dark:text-neutral-200",
              )}
              variant={
                category.id === currentCategory?.id ? "default" : "outline"
              }
              size="sm"
              onClick={() => setCurrentCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <CategoryItem />

      <div className="flex flex-wrap w-full mb-12">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>

          {/* {loading && (
            <div className="text-center">
              <div className="flex items-center justify-center min-h-screen ">
                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                  <svg className="h-20 w-20 animate-spin stroke-[#9e9e9e]" viewBox="0 0 256 256">
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
                  <span className="text-4xl font-medium text-gray-500">Loading Blogs</span>
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 mt-24 text-center">{error}</div>} */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {blogs.map((blog: BlogPost) => (
              <Link href={`/explore/${blog.id}`} key={blog.id}>
                <BlogCard
                  isFollowing={blog.isFollowing}
                  blog={{
                    ...blog,
                    image: blog.thumbnail,
                    description: blog.content.slice(0, 100) + "...", // Default short description
                    blogContent: blog.content, // Full content if needed
                    extra_info: [], // Add an empty array as a default for extra_info
                    user: {
                      username: blog.username,
                      profilePic: blog.profilePic || "/default-avatar.png",
                      name: blog.firstName
                        ? `${blog.firstName} ${blog.lastName}`
                        : blog.username,
                      id: blog.userId,
                      bio: "", // Add default values
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
                />
              </Link>
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
