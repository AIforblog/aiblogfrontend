"use client";

import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/lib/auth";
import { likeJob } from "@/lib/jobs";
import iconComment from "@/public/assets/icons/comment.svg";
import iconShare from "@/public/assets/icons/share.svg";
import { APIJobType } from "@/types/job";
import { Loader2Icon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ActionButtons({ job }: { job: APIJobType }) {
  return (
    <div className="flex items-center gap-2">
      <LikeButton job={job} />

      <button className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
        <Image src={iconComment} width={24} height={24} alt="" />
        <span className="leading-none hidden sm:inline">Comment</span>
      </button>

      <button className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors">
        <Image src={iconShare} width={24} height={24} alt="" />
        <span className="leading-none hidden sm:inline">Forward</span>
      </button>

      <Link
        href={`/jobs/${job.id}/apply`}
        className="px-4 py-2 ml-auto bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] text-[#262626] font-medium capitalize rounded-full transition duration-300 ease-in-out"
      >
        Apply
      </Link>
    </div>
  );
}

const LikeButton = ({ job }: { job: APIJobType }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLikeLoading(true);
      const isUserAuthenticated = await isAuthenticated();
      if (!isUserAuthenticated) {
        toast({ title: "You need to sign in", variant: "destructive" });
        router.push("/auth/sign-in");
        return;
      }

      const { data, error } = await likeJob(job.id);
      if (error) {
        toast({ title: error.message, variant: "destructive" });
        return;
      }

      toast({ title: data.message });
    } catch (e) {
      console.error(e);
      toast({ title: "An error occured", variant: "destructive" });
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <button
      className="p-2 text-neutral-500 flex gap-1 items-center hover:bg-neutral-100 rounded-sm transition-colors"
      onClick={handleLike}
    >
      <ThumbsUpIcon />
      {isLikeLoading ? (
        <Loader2Icon className="w-6 h-6 text-neutral-500 animate-spin" />
      ) : (
        <span className="leading-none hidden sm:inline">Like</span>
      )}
    </button>
  );
};
export default ActionButtons;
