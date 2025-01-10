// app/actions/socials.ts
"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { getAuthHeaders } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API requests
const handleRequest = async <T>(url: string, config = {}): Promise<T> => {
  try {
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${(error as Error).message}`);
  }
};

// Like or Unlike a post
export const reactToPost = async (postId: string): Promise<void> => {
  const url = `${API_BASE_URL}blog/${postId}/react`;
  const headers = await getAuthHeaders();

  await handleRequest(url, {
    method: "POST",
    headers,
  });
};

// Create a comment
export const createComment = async (
  postId: string,
  content: string,
  images: string[] = [],
): Promise<Comment> => {
  const url = `${API_BASE_URL}blog/${postId}/comments`;
  const headers = await getAuthHeaders();

  return await handleRequest<Comment>(url, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: { content, images },
  });
};

// Reply to a comment or reply
export const replyToComment = async (
  postId: string,
  commentId: string,
  content: string,
  images: string[] = [],
): Promise<Comment> => {
  const url = `${API_BASE_URL}blog/${postId}/comments/${commentId}`;
  const headers = await getAuthHeaders();

  return await handleRequest<Comment>(url, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: { content, images },
  });
};

// Get comments for a post with caching
export const getComments = async (postId: string): Promise<Comment[]> => {
  const cookieStore = cookies();
  const cachedComments = cookieStore.get(`comments-${postId}`);

  if (cachedComments) {
    try {
      const parsedComments = JSON.parse(cachedComments.value);
      return parsedComments;
    } catch (parseError) {
      console.error("Error parsing cached comments data:", parseError);
    }
  }

  const url = `${API_BASE_URL}blog/${postId}/comments`;
  const headers = await getAuthHeaders();

  try {
    const response = await handleRequest<{ data: Comment[] }>(url, {
      method: "GET",
      headers,
    });

    // Cache the comments
    cookieStore.set(`comments-${postId}`, JSON.stringify(response.data), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3600, // 1-hour expiration
    });

    return response.data;
  } catch (error) {
    if (cachedComments) {
      return JSON.parse(cachedComments.value);
    }
    throw error;
  }
};

// Types
export interface Comment {
  id: string;
  content: string | null;
  userId: string;
  username: string;
  profilePic: string;
  postId: string;
  images: string[];
  createdAt: string;
  replies: Comment[];
}
