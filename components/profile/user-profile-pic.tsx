"use client";

import { cn} from "@/lib/utils";
import { RoundedImage } from "../shared/rounded-image";
import { UserProps } from "@/types/user";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
}

const ProfilePic: React.FC<ProfileCardProps> = ({
  user,
  className,
}) => {

  return (
    <div className={cn("flex items-center justify-between gap-6", className)}>
      <div className="w-full flex gap-2 items-center ">
        <RoundedImage
          size={120}
          src={user.profile_pic}
          alt={`${user.username} profile pic`}
          className="border-4 border-white"
        />
      </div>
    </div>
  );
};

export default ProfilePic;
