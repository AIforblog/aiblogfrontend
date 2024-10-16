"use client";

import { Button } from "@/components/ui/button";
import { cn, formatTime } from "@/lib/utils";
import { RoundedImage } from "./rounded-image";
import { UserProps } from "@/types/user";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isJobProfile,
  className,
}) => {
  const followAction = async () => {
    console.log("followed user!");
  };

  const applyAction = async () => {
    console.log("Apllication for job successful!");
  };

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="w-full flex gap-2 items-center">
        <RoundedImage
          size={40}
          src={user.profile_pic}
          alt={`${user.username} profile pic`}
        />
        <div className="flex-1 gap-y-1">
          <h4 className="text-sm font-medium text-[#404040] capitalize">
            {user.name}
          </h4>

          <div className="w-fit flex items-center gap-x-2">
            <p className="text-xs font-normal text-[#A3A3A3]">
              {user.username}
            </p>

            <div className="w-[5px] h-[5px] rounded-full bg-[#A3A3A3]" />

            <p className="flex-1 text-xs font-normal text-[#A3A3A3] line-clamp-1">
              {formatTime(user.timestamp)}
            </p>
          </div>
        </div>
      </div>

      {/* Button (Job or Blog) */}
      {isJobProfile ? (
        <Button
          onClick={applyAction}
          className="bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] text-[#262626] font-medium capitalize rounded-full transition duration-300 ease-in-out"
        >
          Apply
        </Button>
      ) : (
        <Button
          onClick={followAction}
          className="bg-[#171717] hover:bg-[#525252] text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
