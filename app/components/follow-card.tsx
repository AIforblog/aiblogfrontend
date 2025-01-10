import { Button } from "@/components/ui/button";
import { RoundedImage } from "./rounded-image";
import { cn } from "@/lib/utils";

const FollowCard = ({
  user,
  className,
}: {
  user: { name: string; profile_pic: string; username: string };
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between", className)}>
      <div className="flex gap-3 items-center">
        <div>
          <RoundedImage
            size={50}
            src={user.profile_pic}
            alt={`${user.username} Profile Pic`}
          />
        </div>
        <div className="font-dm-sans">
          <h4 className="text-sm font-bold">{user.name}</h4>
          <p className="text-xs font-medium">
            {user.username} . <span>3hrs ago</span>
          </p>
        </div>
      </div>
      <form>
        <Button
          className="text-white bg-black rounded-full hover:text-black"
          variant={"secondary"}
        >
          Follow
        </Button>
      </form>
    </div>
  );
};
export default FollowCard;
