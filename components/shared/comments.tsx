import React, { useState } from "react";
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
import { ThumbsUp, ImageIcon, Link2Icon, SmileIcon, XIcon } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  profile_pic: string;
  username: string;
}

interface Image {
  url: string;
  alt: string;
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

interface CommentFormData {
  content: string;
  images: File[];
}

interface CommentsProps {
  postId: string;
  initialComments: ItemComment[];
  initialCommentsCount: number;
  isOpen?: boolean;
  onCommentCountChange?: (count: number) => void;
}

interface CommentBoxProps {
  onAddComment: (comment: CommentFormData) => void;
  replyingTo?: string;
}

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

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex items-center">
      <Image
        src={user.profile_pic}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-2">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-500">@{user.username}</p>
      </div>
    </div>
  );
};

const Comments: React.FC<CommentsProps> = ({
  initialComments = [],
  initialCommentsCount = 0,
  onCommentCountChange,
}) => {
  const [comments, setComments] = useState<ItemComment[]>(initialComments);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  const updateCommentCount = (newCount: number) => {
    setCommentsCount(newCount);
    onCommentCountChange?.(newCount);
  };

  const handleAddComment = (newComment: CommentFormData) => {
    const createdComment: ItemComment = {
      id: Date.now().toString(),
      user: {
        id: "current-user-id",
        name: "Olamide",
        profile_pic: "/images/data-driven-blog/pic.png",
        username: "Olams",
      },
      content: newComment.content,
      images: newComment.images.map((file) => ({
        url: URL.createObjectURL(file),
        alt: file.name,
      })),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
      replyCount: 0,
    };
    setComments([createdComment, ...comments]);
    updateCommentCount(commentsCount + 1);
  };

  const handleReply = (
    commentChain: string[],
    replyComment: CommentFormData
  ) => {
    const updatedComments = [...comments];
    let currentLevel = updatedComments;
    // let currentComment;

    for (let i = 0; i < commentChain.length; i++) {
      const commentId = commentChain[i];
      const commentIndex = currentLevel.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        if (i === commentChain.length - 1) {
          const newReply: ItemComment = {
            id: Date.now().toString(),
            user: {
              id: "current-user-id",
              name: "Olamide",
              profile_pic: "/images/data-driven-blog/pic.png",
              username: "Olams",
            },
            content: replyComment.content,
            images: replyComment.images.map((file) => ({
              url: URL.createObjectURL(file),
              alt: file.name,
            })),
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
            replyCount: 0,
          };
          currentLevel[commentIndex].replies.push(newReply);
          currentLevel[commentIndex].replyCount++;
        } else {
          currentLevel = currentLevel[commentIndex].replies;
        }
      } else {
        // Comment not found, break the loop
        break;
      }
    }

    setComments(updatedComments);
    updateCommentCount(commentsCount + 1);
  };

  return (
    <div className="mt-4 rounded-xl p-4 w-full">
      <CommentList
        comments={comments}
        onReply={handleReply}
        commentChain={[]}
      />
      <div className="bg-[#FDF9D9] mt-4 p-3">
        <CommentBox onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

const CommentBox: React.FC<CommentBoxProps> = ({
  onAddComment,
  replyingTo,
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
      onAddComment({ content: strippedContent, images });
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

    const { from } = editor.state.selection;

    // Insert a space before the link if we're not at the start of the text
    if (from > 0 && editor.state.doc.textBetween(from - 1, from) !== " ") {
      editor.chain().focus().insertContent(" ").run();
    }

    // Insert the linked text
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
          text: text,
        },
      ])
      .insertContent(" ") // Add space after link
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

const CommentList: React.FC<{
  comments: ItemComment[];
  onReply: (commentChain: string[], replyComment: CommentFormData) => void;
  depth?: number;
  commentChain: string[];
}> = ({ comments, onReply, depth = 0, commentChain }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          depth={depth}
          commentChain={[...commentChain, comment.id]}
        />
      ))}
    </div>
  );
};

const CommentItem: React.FC<{
  comment: ItemComment;
  onReply: (commentChain: string[], replyComment: CommentFormData) => void;
  depth: number;
  commentChain: string[];
}> = ({ comment, onReply, depth, commentChain }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [showAllReplies, setShowAllReplies] = useState(depth < 2);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleReply = (replyComment: CommentFormData) => {
    onReply(commentChain, replyComment);
    setIsReplying(false);
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

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
    <div className={`bg-[#FDFFFC] rounded-lg p-4  ${depth > 0 ? "ml-2" : ""}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="">
              <UserProfile user={comment.user} />
              <p className="text-xs text-gray-500">
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full mr-2 inline-block"></span>
                {formatTimeAgo(comment.createdAt)}
              </p>
            </div>

            <div className="">
              <Button
                // onClick={followAction}
                className="bg-[#171717] hover:bg-[#525252] text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out"
              >
                Follow
              </Button>
            </div>
          </div>

          <p className="mt-2">{comment.content}</p>
          {comment.images && comment.images.length > 0 && (
            <div className="flex mt-2 space-x-2 overflow-x-auto">
              {comment.images.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    key={index}
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
          {selectedImage && (
            <ImageModal
              isOpen={!!selectedImage}
              onClose={() => setSelectedImage(null)}
              imageUrl={selectedImage.url}
              alt={selectedImage.alt}
            />
          )}
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={handleLike}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </button>
            <button
              onClick={handleReplyClick}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reply
            </button>
            {comment.replyCount > 0 && (
              <span className="text-sm text-gray-500">
                {comment.replyCount}{" "}
                {comment.replyCount === 1 ? "reply" : "replies"}
              </span>
            )}
          </div>
          {isReplying && (
            <div className="mt-2">
              <CommentBox
                // onAddComment={(replyComment) =>
                //   onReply([...commentChain, comment.id], replyComment)
                // }
                onAddComment={handleReply}
                replyingTo={comment.user.name}
              />
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <>
              {showAllReplies ? (
                <div className="mt-4">
                  <CommentList
                    comments={comment.replies}
                    onReply={onReply}
                    depth={depth + 1}
                    commentChain={commentChain}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowAllReplies(true)}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Show more replies...
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
export type { ItemComment };
