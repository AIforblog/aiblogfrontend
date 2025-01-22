// app/actions/socials.ts
"use server";
import axios from "axios";
import { getAuthHeaders } from "@/lib/auth";
import { ItemComment } from "@/types/comment";

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
    data: { content, images }
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
export const getComments = async (postId: string): Promise<ItemComment[]> => {
  console.log(postId);
  const url = `${API_BASE_URL}blog/${postId}/comments`;
  const headers = await getAuthHeaders();

  try {
    const response = await handleRequest<{ data:ItemComment[] }>(url, {
      method: "GET",
      headers,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
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
