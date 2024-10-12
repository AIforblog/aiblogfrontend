import Button from "@/app/components/CustomButton/Button";
import { JobDummyData } from "@/data/mock/job";
import iconComment from "@/public/assets/icons/comment.svg";
import iconShare from "@/public/assets/icons/share.svg";
import { ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Aside from "./_components/aside";
import Comments from "./_components/comments";
import JobContent from "./_components/job-content";

const JobPage = () => {
  const job = JobDummyData[0];
  return (
    <main className="bg-white grow relative">
      <div className="absolute inset-0 px-8">
        <div className="flex gap-[30px] lg:gap-[60px] pt-8 pb-4 max-w-[1180px] mx-auto max-h-full overflow-hidden">
          <div className="max-w-screen-md mx-auto w-full max-h-full overflow-y-auto sm:p-8 space-y-4 rounded-[24px] sm:border border-neutral-200 custom-scroll">
            <JobContent job={job} />
            <ActionButtons />
            <Comments />
          </div>

          <Aside />
        </div>
      </div>
    </main>
  );
};


const ActionButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
        <ThumbsUpIcon />
        <span className="leading-none hidden sm:inline">Like</span>
      </button>

      <button className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
        <Image src={iconComment} width={24} height={24} alt="" />
        <span className="leading-none hidden sm:inline">Comment</span>
      </button>

      <button className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
        <Image src={iconShare} width={24} height={24} alt="" />
        <span className="leading-none hidden sm:inline">Forward</span>
      </button>

      <Button className="ml-auto font-medium" color="secondary">
        Apply
      </Button>
    </div>
  );
};

export default JobPage;