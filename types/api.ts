export type SuccessResponse<T> = {
  isFollowing?: boolean | PromiseLike<boolean>;
  statusCode: number;
  message: string;
  data: T;
};

// May differ
export type ErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
};
export interface ItemComment {
  id: string;
  user: User;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  replies: ItemComment[];
  replyCount: number;
};
export interface User {
  id: string;
  name: string;
  avatar?: string;
  profile_pic: string | null;
  username: string;
};

export interface Image {
  url: string;
  alt: string;
}
