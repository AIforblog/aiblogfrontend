//aiblogfrontend\actions\getBlogs.ts
"use server";
import type { BlogResponse, SingleBlogResponse } from "@/types/blog";
import { cookies } from "next/headers";
import { getAuthHeaders } from "@/lib/auth";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBlogs(page = 1, featured = false, search = "") {
  const cookieStore = cookies();

  try {
    const headers = await getAuthHeaders();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(featured && { featured: "true" }),
      ...(search && { search }),
    });

    const response = await axios.get<BlogResponse>(
      `${API_BASE_URL}blog?${queryParams}`,
      {
        headers,
      }
    );

    if (!response.data || !response.data.data?.results) {
      throw new Error("Invalid blog data received");
    }

    // Store the blog data in cookies
    try {
      cookieStore.set("blogData", JSON.stringify(response.data.data.results), {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour expiration
      });
    } catch (cookieError) {
      console.error("Error setting blog data cookie:", cookieError);
      // Continue execution even if cookie storage fails
    }

    return response.data;
  } catch (error) {
    // Try to get data from cookies if API call fails
    const cachedData = cookieStore.get("blogData");
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData.value);
        return {
          statusCode: 200,
          message: "Data retrieved from cache",
          data: {
            count: parsedData.length,
            page: page,
            next: false,
            prev: false,
            results: parsedData,
          },
        };
      } catch (parseError) {
        console.error("Error parsing cached blog data:", parseError);
      }
    }
    throw error;
  }
}

export async function getBlogPost(postId: string) {
  if (!postId) {
    throw new Error("Post ID is required");
  }

  const cookieStore = cookies();

  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<SingleBlogResponse>(
      `${API_BASE_URL}blog/${postId}`,
      {
        headers,
      }
    );

    if (!response.data || !response.data.data) {
      throw new Error("Post not found");
    }

    // Store the current blog post in cookies
    try {
      cookieStore.set("currentBlog", JSON.stringify(response.data.data), {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour expiration
      });
    } catch (cookieError) {
      console.error("Error setting current blog cookie:", cookieError);
      // Continue execution even if cookie storage fails
    }

    return response.data;
  } catch (error) {
    // Try to get data from cookies if API call fails
    const cachedBlog = cookieStore.get("currentBlog");
    if (cachedBlog) {
      try {
        const parsedBlog = JSON.parse(cachedBlog.value);
        if (parsedBlog.id === postId) {
          return {
            statusCode: 200,
            message: "Data retrieved from cache",
            data: parsedBlog,
          };
        }
      } catch (parseError) {
        console.error("Error parsing cached blog post:", parseError);
      }
    }
    throw error;
  }
}

export async function getCurrentBlogFromCookie() {
  const cookieStore = cookies();
  const cachedBlog = cookieStore.get("currentBlog");
  if (cachedBlog) {
    try {
      return JSON.parse(cachedBlog.value);
    } catch (error) {
      console.error("Error parsing current blog cookie:", error);
      return null;
    }
  }
  return null;
}
