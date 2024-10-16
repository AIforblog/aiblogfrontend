/* eslint-disable react/display-name */
import { memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PostMetrics, UserProfile } from "../shared";
import { JobType } from "@/types/job";
import Link from "next/link";

const JobCard = memo<{ job: JobType }>(({ job }) => {
  return (
    <Card className="w-full p-6 mb-6 flex flex-col gap-y-3 border-none bg-white rounded-xl shadow-none has-[a:hover]:bg-white/80 transition-colors">
      <CardHeader className="p-0">
        <UserProfile user={job.user} isJobProfile />
      </CardHeader>

      <Link href={`/jobs/jobId`}>
        <CardContent className="flex flex-col p-0 gap-y-3">
          <CardDescription className="flex flex-col p-0 gap-y-3">
            {/* Title */}
            <CardTitle className="text-xl font-semibold capitalize leading-7 text-[#262626] ">
              {job.title}
            </CardTitle>

            {/* Description */}
            <p className="text-base font-normal leading-6 text-[#737373]">{job.description}</p>
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="p-0 mt-1">
        <PostMetrics item={job.metrics} key={job.user?.username + job.title} />
      </CardFooter>
    </Card>
  );
});

export default JobCard;
