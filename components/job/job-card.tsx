"use client";

import type { APIJobType } from "@/types/job";
import Link from "next/link";
import { memo } from "react";
import { PostMetrics, UserProfile } from "../shared";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import JobExtraInfo from "./job-extra-info";
// import DOMPurify from "dompurify";
import { sanitizeContent } from "@/hooks/sanitize";

const JobCard = memo<{ job: APIJobType }>(({ job }) => {
  const {
    id,
    title,
    description,
    username,
    firstName,
    lastName,
    comments,
    userId,
    profilePic,
    likes,
  } = job;

  // const sanitizeContent = (content: string) => {
  //   try {
  //     return DOMPurify?.sanitize?.(content) || content;
  //   } catch (error) {
  //     console.error("DOMPurify sanitization failed:", error);
  //     return content;
  //   }
  // };

  const sanitizedDescription = sanitizeContent(description);

  return (
    <Card className="w-full p-4 md:p-6 mb-4 md:mb-6 border-[0.8px] md:border-0 border-[#e5e5e5] flex flex-col gap-y-3 bg-white rounded-2xl md:rounded-xl shadow-none has-[a:hover]:bg-white/80 transition-colors">
      <CardHeader className="p-0">
        <UserProfile
          user={{
            username: username,
            id: userId,
            profilePic: profilePic,
            name: firstName && lastName ? firstName + " " + lastName : username,
          }}
          isJobProfile
        />
      </CardHeader>

      <Link href={`/jobs/${id}`}>
        <CardContent className="flex flex-col p-0 gap-y-3">
          <CardDescription className="flex flex-col p-0 gap-y-2 md:gap-y-3">
            {/* Title */}
            <CardTitle className="text-lg md:text-xl font-semibold capitalize leading-7 text-[#262626]">
              {title}
            </CardTitle>

            {/* Description */}
            <p
              className="text-sm md:text-base font-normal leading-6 text-[#737373] line-clamp-3"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="p-0">
        <div className="mt-1 flex flex-col flex-1 gap-y-3 md:flex-row md:items-center md:justify-between">
          <PostMetrics
            item={{ likesCount: likes, commentsCount: comments, sharesCount: 0 }}
            key={username + title}
          />

          <JobExtraInfo customOption={"Custom"} normalStrings={[]} repliesCount={0} />
        </div>
      </CardFooter>
    </Card>
  );
});

JobCard.displayName = "JobCard";

export default JobCard;
