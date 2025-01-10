"use client";

import Button from "@/components/shared/button";
import { toast } from "@/hooks/use-toast";
import imgProfile from "@/public/assets/nav-profile.png";
import { APIJobCommentType } from "@/types/job";
import { ImageIcon, Link2Icon, SmileIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface CommentsProps {
  comments: Array<APIJobCommentType>;
}
const Comments = ({ comments }: CommentsProps) => {
  return (
    <div>
      {comments.length > 0 && null}
      <div className="border border-neutral-200 bg-[#FDF9D9] rounded-xl p-2 sm:p-4 flex gap-3 items-start">
        <div className="hidden sm:block w-10 h-10 relative md:w-12 md:h-12 shrink-0">
          <Image
            fill
            src={imgProfile}
            alt=""
            className="rounded-full object-center"
          />
        </div>
        <CommentBox />
      </div>
    </div>
  );
};

const CommentBox = () => {
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    const isValid = files.every((f) => f.type.startsWith("image/"));
    if (!isValid) {
      toast({
        title: "Invalid format",
        description: "Files must be images.",
        variant: "destructive",
      });
      return;
    }

    setImages((prev) => {
      prev.forEach(({ url }) => URL.revokeObjectURL(url));
      return files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    });
  };

  const onRemoveImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      <div className="border border-neutral-200 rounded overflow-hidden">
        <label className="relative p-4 bg-white w-full flex flex-col group/comment-label">
          <textarea
            name="job-comment"
            id="job-comment"
            placeholder="Add a comment..."
            className="peer resize-none bg-transparent focus-visible:outline-none w-full leading-[1.6] h-[123px]"
          ></textarea>

          <div className="absolute right-4 top-4 flex gap-6 peer-focus:hidden transition-opacity group-hover/comment-label:!flex py-1 px-2 bg-white">
            <button
              className="p-1 -m-1 hover:bg-neutral-50 rounded-sm"
              aria-label="Add link"
            >
              <Link2Icon className="w-5 h-5 text-neutral-500" />
            </button>
            <label
              className="p-1 -m-1 hover:bg-neutral-50 rounded-sm cursor-pointer"
              aria-label="Add link"
            >
              <ImageIcon className="w-5 h-5 text-neutral-500" />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*"
              />
            </label>
            <button
              className="p-1 -m-1 hover:bg-neutral-50 rounded-sm"
              aria-label="Add link"
            >
              <SmileIcon className="w-5 h-5 text-neutral-500" />
            </button>
          </div>
        </label>

        {images.length > 0 ? (
          <div className="flex overflow-x-auto gap-2 p-4 pt-0 bg-white w-full">
            {images.map(({ url }) => (
              <div key={url} className="relative aspect-square w-[100px]">
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white p-0.5 rounded-full z-10 hover:bg-neutral-50"
                  title="Remove Image"
                  aria-label="Remove label"
                  onClick={() => onRemoveImage(url)}
                >
                  <XIcon className="w-4 h-4" />
                </button>
                <Image
                  src={url}
                  fill
                  alt=""
                  className="object-cover object-center rounded"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <Button className="font-medium mt-4" color="secondary">
        Comment
      </Button>
    </div>
  );
};

export default Comments;
