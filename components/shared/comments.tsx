"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ThumbsUp,
  ImageIcon,
  Link2Icon,
  SmileIcon,
  XIcon,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { useMinimalTiptapEditor } from "../../app/components/minimal-tiptap/hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import { Mention } from "@tiptap/extension-mention";
import type { SuggestionKeyDownProps } from "@tiptap/suggestion";
import EmojiPicker from "emoji-picker-react";
import { Editor } from "@tiptap/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createComment, replyToComment, getComments } from "@/actions/socials";
import { Comment } from "@/actions/socials";
import { UserProfile } from "@/components/shared";

// Convert backend Comment to frontend ItemComment
const convertCommentToItemComment = (comment: Comment): ItemComment => {
  return {
    id: comment.id,
    postId: comment.postId,
    user: {
      id: comment.userId,
      name: comment.username,
      profile_pic: comment.profilePic || "",
      username: comment.username,
    },
    content: comment.content || "",
    images: Array.isArray(comment.images)
      ? comment.images.map((imageUrl) => ({
          url: imageUrl,
          alt: "Comment image",
        }))
      : [],
    createdAt: comment.createdAt,
    likes: 0,
    replies: Array.isArray(comment.replies)
      ? comment.replies.map(convertCommentToItemComment)
      : [],
    replyCount: Array.isArray(comment.replies) ? comment.replies.length : 0,
  };
};

// Properly handle replies recursively
//   if (Array.isArray(comment.replies) && comment.replies.length > 0) {
//     convertedComment.replies = comment.replies.map(convertCommentToItemComment);
//     convertedComment.replyCount = comment.replies.length;
//   }

//   return convertedComment;
// };

interface User {
  id: string;
  name: string;
  avatar?: string;
  profile_pic: string;
  username: string;
}

interface CommentThreadProps {
  comment: ItemComment;
  onReply: (commentId: string, replyComment: CommentFormData) => void;
  depth?: number;
}

interface Image {
  url: string;
  alt: string;
}

interface ItemComment {
  id: string;
  postId?: string;
  user: User;
  content: string;
  images: Image[];
  createdAt: string;
  likes: number;
  replies: ItemComment[];
  replyCount: number;
}

interface CommentFormData {
  content: string;
  images: File[];
}

interface CommentsProps {
  postId: string;
  isOpen?: boolean;
  onCommentCountChange?: (count: number) => void;
}

interface CommentBoxProps {
  postId: string;
  onAddComment: (comment: CommentFormData) => void;
  replyingTo?: string;
  parentCommentId?: string;
}

// interface CommentListProps {
//   comments: ItemComment[];
//   onReply: (commentId: string, replyComment: CommentFormData) => void;
//   depth?: number;
//   // commentChain: string[]; // Keep for backward compatibility
// }

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, url: string) => void;
  // editor: Editor | null;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <XIcon className="w-5 h-5" />
          </button>
          <Image
            src={imageUrl}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const LinkDialog: React.FC<LinkDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text && url) {
      // Ensure URL has protocol
      const processedUrl = url.startsWith("http") ? url : `https://${url}`;
      onSave(text, processedUrl);
      setText("");
      setUrl("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Link text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Comments: React.FC<CommentsProps> = ({
  postId,
  isOpen = true,
  onCommentCountChange,
}) => {
  const [comments, setComments] = useState<ItemComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshComments = useCallback(async () => {
    if (!postId) return;

    try {
      setIsLoading(true);
      const fetchedComments = await getComments(postId);
      const convertedComments = fetchedComments.map(
        convertCommentToItemComment
      );
      setComments(convertedComments);
      onCommentCountChange?.(convertedComments.length);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, onCommentCountChange]);

  useEffect(() => {
    if (isOpen) {
      refreshComments();
    }
  }, [refreshComments, isOpen]);

  const handleAddComment = async (newComment: CommentFormData) => {
    try {
      setIsLoading(true);
      const base64Images = await Promise.all(
        newComment.images.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );

      const optimisticComment = {
        id: Date.now().toString(),
        postId: postId,
        content: newComment.content,
        images: base64Images,
        userId: "temp",
        username: "You",
        profilePic: "",
        replies: [],
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => [
        convertCommentToItemComment(optimisticComment),
        ...prev,
      ]);

      await createComment(postId, newComment.content, base64Images);
      // Refresh comments after creation
      await refreshComments();
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (
    parentCommentId: string,
    replyComment: CommentFormData
  ) => {
    try {
      setIsLoading(true);
      const base64Images = await Promise.all(
        replyComment.images.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === parentCommentId) {
            const optimisticReply = {
              postId: postId,
              id: Date.now().toString(),
              content: replyComment.content,
              images: base64Images,
              userId: "temp",
              username: "You",
              profilePic: "",
              replies: [],
              createdAt: new Date().toISOString(),
            };

            return {
              ...comment,
              replies: [
                ...comment.replies,
                convertCommentToItemComment(optimisticReply),
              ],
              replyCount: comment.replyCount + 1,
            };
          }
          return comment;
        })
      );

      await replyToComment(
        postId,
        parentCommentId,
        replyComment.content,
        base64Images
      );

      // Optional: Refresh comments to ensure sync
      await refreshComments();
    } catch (error) {
      console.error("Failed to create reply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4 rounded-xl p-4 w-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <Loader className="animate-spin text-gray-500" size={24} />
        </div>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            depth={0}
          />
        ))}
      </div>
      <div className="bg-[#FDF9D9] mt-4 p-3">
        <CommentBox postId={postId} onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

const CommentBox: React.FC<CommentBoxProps> = ({
  onAddComment,
  replyingTo,
  parentCommentId,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const editor = useMinimalTiptapEditor({
    extensions: [
      StarterKit,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-600",
          rel: "noopener noreferrer",
        },
      }),
      Mention.configure({
        suggestion: {
          items: ({ query }: { query: string; editor: Editor }) => {
            if (typeof query !== "string") {
              return []; // or handle this case as needed
            }
            // Replace this with your actual user data
            const users = [
              { id: "1", name: "John Doe", username: "johndoe" },
              { id: "2", name: "Jane Smith", username: "janesmith" },
            ];
            return users
              .filter((user) =>
                user.username.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5);
          },
          render: () => {
            let popup: HTMLElement;

            return {
              onBeforeStart: () => {
                // Optional setup before showing popup
              },
              onStart: (props) => {
                popup = document.createElement("div");
                popup.className = "mention-popup";
                document.body.appendChild(popup);

                const suggestions = props.items
                  .map(
                    (item: any) =>
                      `<div class="mention-item">${item.name} (@${item.username})</div>`
                  )
                  .join("");

                popup.innerHTML = suggestions;

                const rect = props.clientRect?.();
                if (rect) {
                  popup.style.left = `${rect.left}px`;
                  popup.style.top = `${rect.top}px`;
                }
              },
              onUpdate: (props) => {
                const rect = props.clientRect?.();
                if (rect) {
                  popup.style.left = `${rect.left}px`;
                  popup.style.top = `${rect.top}px`;
                }
              },
              onKeyDown: (props: SuggestionKeyDownProps) => {
                // Handle keyboard navigation
                console.log("Keydown event:", props);
                return false; // Required return value
              },
              onExit: () => {
                console.log(popup);
                if (popup) {
                  console.log(popup);
                  popup.remove();
                } else {
                  console.warn("Popup is undefined");
                }
              },
            };
          },
        },
      }),
      Placeholder.configure({
        placeholder: replyingTo
          ? `Reply to @${replyingTo}...`
          : "Add a comment...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[96px] px-4 py-2",
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor) return;

    const content = editor.getHTML();
    if (content.trim() || images.length > 0) {
      // Strip HTML tags for plain text display
      const strippedContent = content.replace(/<[^>]*>/g, "");

      // Determine whether it's a top-level comment or a reply
      if (parentCommentId) {
        // It's a reply
        onAddComment?.({ content: strippedContent, images });
      } else {
        // It's a top-level comment
        onAddComment?.({ content: strippedContent, images });
      }

      editor.commands.clearContent();
      setImages([]);
    }
  };

  const onImageAdd = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleLinkAdd = (text: string, url: string) => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    editor
      .chain()
      .focus()
      .insertContentAt(
        { from, to },
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
      )
      .run();
  };
  if (!editor) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="border border-neutral-200 rounded overflow-hidden bg-white">
        <div className="p-4">
          <EditorContent editor={editor} />

          {images.length > 0 && (
            <div className="flex overflow-x-auto gap-2 p-4 bg-gray-50">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={24}
                    height={24}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                className="hidden"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    onImageAdd(Array.from(e.target.files));
                  }
                }}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <ImageIcon className="w-5 h-5" />
              </label>

              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Link2Icon className="w-5 h-5" />
              </button>

              <Popover>
                <PopoverTrigger>
                  <SmileIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </PopoverTrigger>
                <PopoverContent>
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      editor.commands.insertContent(emoji.emoji);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" variant="secondary">
              {replyingTo ? "Reply" : "Comment"}
            </Button>
          </div>
          <LinkDialog
            isOpen={isLinkDialogOpen}
            onClose={() => setIsLinkDialogOpen(false)}
            onSave={handleLinkAdd}
            // editor={editor}
          />
        </div>
      </div>
    </form>
  );
};

const CommentThread: React.FC<CommentThreadProps> = ({
  comment,
  onReply,
  depth = 0,
}) => {
  const [showReplies, setShowReplies] = useState(depth < 2);
  const [isReplying, setIsReplying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleReply = (replyData: CommentFormData) => {
    onReply(comment.id, replyData);
    setIsReplying(false);
  };

  return (
    <div className={`bg-[#FDFFFC] rounded-lg p-4 ${depth > 0 ? "ml-6" : ""}`}>
      <CommentContent
        comment={comment}
        onReplyClick={() => setIsReplying(!isReplying)}
        onImageClick={setSelectedImage}
      />

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
        />
      )}

      {isReplying && (
        <div className="mt-2">
          <CommentBox
            postId={comment.id}
            onAddComment={handleReply}
            replyingTo={comment.user.username}
            parentCommentId={comment.id}
          />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <>
          {showReplies ? (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentThread
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  depth={depth + 1}
                />
              ))}
            </div>
          ) : (
            <button
              onClick={() => setShowReplies(true)}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700"
            >
              Show {comment.replies.length} replies
            </button>
          )}
        </>
      )}
    </div>
  );
};

interface CommentContentProps {
  comment: ItemComment;
  onReplyClick: () => void;
  onImageClick: (image: Image) => void;
}

const CommentContent: React.FC<CommentContentProps> = ({
  comment,
  onReplyClick,
  onImageClick,
}) => {
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - commentDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-1">
        <div className="flex items-center gap-10 justify-between">
          <div>
            <UserProfile
              user={{
                id: comment.user.id,
                username: comment.user.username,
                profilePic: comment.user.profile_pic,
                name: comment.user.name,
              }}
            />
            <p className="text-xs text-gray-500">
              <span className="w-2 h-2 bg-[#9CA3AF] rounded-full mr-2 inline-block"></span>
              {formatTimeAgo(comment.createdAt)}
            </p>
          </div>
        </div>

        <p className="mt-2">{comment.content}</p>

        {comment.images && comment.images.length > 0 && (
          <div className="flex mt-2 space-x-2 overflow-x-auto">
            {comment.images.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => onImageClick(image)}
              >
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  alt={image.alt}
                  className="rounded"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4 mt-2">
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {comment.likes}
          </button>
          <button
            onClick={onReplyClick}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reply
          </button>
          {comment.replies.length > 0 && (
            <span className="text-sm text-gray-500">
              {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
export type { ItemComment };
