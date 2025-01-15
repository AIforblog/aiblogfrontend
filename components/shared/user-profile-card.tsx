"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoundedImage } from "./rounded-image";
import { UserProps } from "@/types/user";
import FollowButton from "@/app/components/follow-button";
import { useUser } from "@/context/userProfilectx";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
  following?: boolean;
  isFollowing?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isJobProfile,
  className,
  isFollowing,
}) => {
  const applyAction = async () => {
    console.log("Application for job successful!");
  };
  const { user: loggedinUser, loading } = useUser();

  return (
    <div className={cn("flex items-center justify-between gap-6", className)}>
      <div className="w-full flex gap-2 items-center">
        <RoundedImage
          size={40}
          src={user.profilePic || "/default-profile-avatar.webp"}
          alt={`${user.username} profile pic`}
        />

        <div className="flex-1 gap-y-1">
          <h4 className="text-sm font-medium text-[#404040] dark:text-neutral-100 capitalize">
            {user?.name ||
              `${user?.firstName || user.username}  ${user?.lastName || ""}`}
          </h4>

          <div className="w-fit flex items-center gap-x-2">
            <p className="text-xs font-normal text-[#A3A3A3] dark:text-neutral-200">
              {user.username}
            </p>

            <div className="w-[5px] h-[5px] rounded-full bg-[#A3A3A3]" />

            <p className="flex-1 text-xs font-normal text-[#A3A3A3] line-clamp-1">
              {/* Dunno what this is for */}
              {/* {formatTime(user.createdAt)} */}
            </p>
          </div>
        </div>
      </div>

      {/* Render follow/unfollow button */}
      <div>
        {isJobProfile ? (
          <Button
            onClick={applyAction}
            className="bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] text-sm h-9 inline-flex items-center justify-center text-[#262626] font-medium capitalize rounded-full transition duration-300 ease-in-out"
          >
            Apply
          </Button>
        ) : (
          // renderFollowButton()
          <div>
            {!loading && loggedinUser?.userId !== user.userId && (
              <FollowButton userId={user.userId} isFollowing={isFollowing} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
