import React from "react";
import { JobCard } from "../job";
import { APIJobType } from "@/types/job";

function ProfileJobs({
  job,
  isFollowing,
}: {
  job: APIJobType[];
  isFollowing?: boolean;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 pb-10">
        {job.map((item, index) => (
          <div key={index} className="border rounded-lg">
            <JobCard job={item} isFollowing={isFollowing} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileJobs;
