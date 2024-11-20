"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DefaultImage, RoundedImage } from "./rounded-image";
import { useServerAction } from "zsa-react";
import { Loader } from "lucide-react";
import { action } from "@/actions/follow";
import { revalidateTagServer } from "@/actions/common";

interface ProfileCardProps {
  user: { id: string; name: string; username: string; profilePic: string };
  isJobProfile?: boolean;
  className?: string;
  following?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isJobProfile,
  className,
  following,
}) => {
  const { execute, isPending } = useServerAction(action, {
    onError({ err }) {
      console.log("something went wrong", err);
    },
    onSuccess() {
      console.log("Successful");
    },
  });

  async function onSubmit(path: "follow" | "unfollow") {
    const [data, err] = await execute({
      followeeId: user.id,
      path,
    });

    if (err) {
      console.error(err);
    }
    if (data) {
      await revalidateTagServer(path === "follow" ? "followers" : "followees");
      console.log(data);
    }
  }

  const applyAction = async () => {
    console.log("Application for job successful!");
  };

  // Function to render the appropriate action button based on follow status
  const renderFollowButton = () => {
    if (following) {
      return (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            onSubmit("unfollow");
          }}
        >
          <Button
            className="text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out items-center gap-4"
            disabled={isPending}
          >
            {isPending && <Loader className="animate-spin" size={18} />}
            Unfollow
          </Button>
        </form>
      );
    }
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit("follow");
        }}
      >
        <Button
          className="bg-[#171717] hover:bg-[#525252] text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out items-center gap-4"
          disabled={isPending}
        >
          {isPending && <Loader className="animate-spin" size={18} />}
          Follow
        </Button>
      </form>
    );
  };

  return (
    <div className={cn("flex items-center justify-between gap-6", className)}>
      <div className="w-full flex gap-2 items-center">
        {user.profilePic ? (
          <RoundedImage
            size={40}
            src={user.profilePic}
            alt={`${user.username} profile pic`}
          />
        ) : (
          <DefaultImage letter="A" />
        )}
        <div className="flex-1 gap-y-1">
          <h4 className="text-sm font-medium text-[#404040] dark:text-neutral-100 capitalize">
            {user.name}
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
          renderFollowButton()
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
