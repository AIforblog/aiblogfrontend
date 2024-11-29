"use client";

import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useServerAction } from "zsa-react";
import { revalidateTagServer } from "@/actions/common";
import { action } from "@/actions/follow";
import { cn } from "@/lib/utils";



interface FollowButtonProps {
  userId: string;
  isFollowing?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId ,  isFollowing }) => {
  const [following, setFollowing] = useState<boolean | undefined>(isFollowing);
  const { execute, isPending } = useServerAction(action, {
    onError({ err }) {
      console.log("Something went wrong", err);
    },
    onSuccess() {
      console.log("Action was successful");
    },
  });


  const handleFollowAction = async (path: "follow" | "unfollow") => {
    const [data, err] = await execute({
      followeeId: userId,
      path,
    });

    if (err) {
      console.error(err);
      return;
    }

    if (data) {
      await revalidateTagServer(path === "follow" ? "followers" : "followees");
      setFollowing(path === "follow");
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        handleFollowAction(following ? "unfollow" : "follow");
      }}
    >
      
      <Button
        className={cn(
          "font-medium capitalize rounded-full transition duration-300 ease-in-out items-center gap-4",
          following
            ? "text-[#FAFAFA]"
            : "bg-[#171717] hover:bg-[#525252] text-[#FAFAFA]"
        )}
        disabled={isPending}
      >
        {isPending && <Loader className="animate-spin" size={18} />}
        {following ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
};

export default FollowButton;
