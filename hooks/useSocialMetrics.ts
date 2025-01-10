import { useState, useCallback, useMemo } from "react";

// Types
interface Comment {
  id: string;
  postId: string;
  userId: string;
  comment: string;
  createdAt: string;
}

interface CommentResponse {
  statusCode: number;
  message: string;
  data: {
    count: number;
    page: number;
    next: boolean;
    prev: boolean;
    results: Comment[];
  };
}

interface CreateCommentResponse {
  statusCode: number;
  message: string;
  data: Comment;
}

interface ReactResponse {
  statusCode: number;
  message: string;
}

interface SocialMetricsError {
  message: string;
  statusCode?: number;
}

interface UseSocialMetricsProps {
  postId: string;
  accessToken?: string;
}

interface UseSocialMetricsReturn {
  // Comments
  comments: Comment[];
  commentsCount: number;
  isLoadingComments: boolean;
  commentError: SocialMetricsError | null;
  fetchComments: (page?: number) => Promise<void>;
  createComment: (comment: string) => Promise<Comment | null>;

  // Reactions
  isLiked: boolean;
  isLoadingReaction: boolean;
  reactionError: SocialMetricsError | null;
  toggleReaction: () => Promise<void>;

  // General
  clearErrors: () => void;
}

export const useSocialMetrics = ({
  postId,
  accessToken,
}: UseSocialMetricsProps): UseSocialMetricsReturn => {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;

  // States
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentError, setCommentError] = useState<SocialMetricsError | null>(
    null,
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isLoadingReaction, setIsLoadingReaction] = useState(false);
  const [reactionError, setReactionError] = useState<SocialMetricsError | null>(
    null,
  );

  // Helper function for API calls
  const apiCall = useMemo(
    () =>
      async (endpoint: string, options: RequestInit = {}) => {
        const url = `${baseUrl}${endpoint}`;
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          ...options.headers,
        };

        try {
          const response = await fetch(url, { ...options, headers });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          throw error instanceof Error
            ? error
            : new Error("An unknown error occurred");
        }
      },
    [baseUrl, accessToken],
  );

  // Fetch comments
  const fetchComments = useCallback(
    async (page: number = 1) => {
      setIsLoadingComments(true);
      setCommentError(null);

      try {
        const response: CommentResponse = await apiCall(
          `blog/${postId}/comments?page=${page}`,
        );

        setComments(response.data.results);
        setCommentsCount(response.data.count);
      } catch (error) {
        setCommentError({
          message:
            error instanceof Error ? error.message : "Failed to fetch comments",
          statusCode: 500,
        });
      } finally {
        setIsLoadingComments(false);
      }
    },
    [postId, apiCall],
  );

  // Create comment
  const createComment = useCallback(
    async (comment: string): Promise<Comment | null> => {
      if (!accessToken) {
        setCommentError({
          message: "Authentication required",
          statusCode: 401,
        });
        return null;
      }

      setCommentError(null);

      try {
        const response: CreateCommentResponse = await apiCall(
          `blog/${postId}/comments`,
          {
            method: "POST",
            body: JSON.stringify({ comment }),
          },
        );

        // Update local state
        setComments((prev) => [response.data, ...prev]);
        setCommentsCount((prev) => prev + 1);

        return response.data;
      } catch (error) {
        setCommentError({
          message:
            error instanceof Error ? error.message : "Failed to create comment",
          statusCode: 500,
        });
        return null;
      }
    },
    [postId, accessToken, apiCall],
  );

  // Toggle reaction (like/unlike)
  const toggleReaction = useCallback(async () => {
    if (!accessToken) {
      setReactionError({ message: "Authentication required", statusCode: 401 });
      return;
    }

    setIsLoadingReaction(true);
    setReactionError(null);

    try {
      await apiCall(`blog/${postId}/react`, { method: "POST" });

      setIsLiked((prev) => !prev);
    } catch (error) {
      setReactionError({
        message:
          error instanceof Error ? error.message : "Failed to toggle reaction",
        statusCode: 500,
      });
    } finally {
      setIsLoadingReaction(false);
    }
  }, [postId, accessToken, apiCall]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setCommentError(null);
    setReactionError(null);
  }, []);

  return {
    // Comments
    comments,
    commentsCount,
    isLoadingComments,
    commentError,
    fetchComments,
    createComment,

    // Reactions
    isLiked,
    isLoadingReaction,
    reactionError,
    toggleReaction,

    // General
    clearErrors,
  };
};

export type {
  Comment,
  CommentResponse,
  CreateCommentResponse,
  ReactResponse,
  SocialMetricsError,
  UseSocialMetricsProps,
  UseSocialMetricsReturn,
};
