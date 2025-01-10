"use client";

import { sanitizeContent } from "@/hooks/sanitize";
import { APIJobCommentType, APIJobType } from "@/types/job";
// import DOMPurify from "dompurify";

interface JobContentProps {
  job: APIJobType & { replies: Array<APIJobCommentType> };
}

const JobContent = ({ job }: JobContentProps) => {
  const { title, instruction, description, username } = job;

  // const sanitizeContent = (content: string) => {
  //   try {
  //     return DOMPurify?.sanitize?.(content) || content;
  //   } catch (error) {
  //     console.error("DOMPurify sanitization failed:", error);
  //     return content;
  //   }
  // };

  const sanitizedDescription = sanitizeContent(description);
  const sanitizedInstruction = sanitizeContent(instruction);

  const readingTime = getReadingTime(
    sanitizedDescription + " " + sanitizedInstruction,
  );
  return (
    <div className="space-y-4 pb-3 border-b border-neutral-200">
      <div className="space-y-4 pb-3 border-dashed-b">
        <h1 className="text-[32px] leading-[1.2] font-bold">{title}</h1>
        <div className="flex text-sm gap-1 leading-[1.36] text-neutral-400 items-center">
          <p>@{username}</p>
          <span className="bg-neutral-300 w-1.5 h-1.5 rounded-full" />
          <p>
            {readingTime < 1
              ? "Less than a min"
              : `${Math.round(readingTime)} mins read`}
          </p>
        </div>
      </div>

      <p
        className="text-neutral-600 leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      ></p>
      <article
        className="text-neutral-600 leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: sanitizedInstruction }}
      ></article>

      <div className="flex gap-2 items-center flex-wrap">
        <p className="flex items-center font-medium bg-[#FCF4AA] text-black text-sm px-2 py-1 leading-[1.6] rounded-full w-fit">
          <span>Replies</span>
          {job.replies.length > 0 && (
            <span className="ml-1 p-1 leading-none bg-white rounded-full text-neutral-600">
              {job.replies.length}
            </span>
          )}
        </p>

        <div className="text-sm px-2 py-1 font-medium bg-neutral-50 rounded-full">
          Nigeria
        </div>

        <div className="text-sm px-2 py-1 font-medium bg-neutral-50 rounded-full flex gap-1 items-center">
          <span className="w-2 h-2 bg-[#0984E3] rounded-full" />
          <span>Custom</span>
        </div>
      </div>
    </div>
  );
};

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(" ");
  return words.length / wordsPerMinute;
};

export default JobContent;
