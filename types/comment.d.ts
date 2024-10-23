// types/comment.ts

export interface User {
  id: string;
  name: string;
  avatar?: string;
  profile_pic: string;
  username: string;
}

interface ItemComment {
  id: string;
  user: User;
  content: string;
  images: Image[];
  createdAt: string;
  likes: number;
  replies: ItemComment[];
  replyCount: number;
}

export interface Image {
  url: string;
  alt: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  images: Image[];
  createdAt: string;
  likes: number;
  replies: Comment[];
  replyCount: number;
}

export interface CommentFormData {
  content: string;
  images: File[];
}

export interface CommentsProps {
  postId: string;
  initialComments: Comment[];
  initialCommentsCount: number;
}

export interface CommentBoxProps {
  onAddComment: (comment: CommentFormData) => void;
  replyingTo?: string | null;
}

export interface CommentListProps {
  comments: Comment[];
  onReply: (parentId: string, replyComment: CommentFormData) => void;
}

export interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, replyComment: CommentFormData) => void;
}
