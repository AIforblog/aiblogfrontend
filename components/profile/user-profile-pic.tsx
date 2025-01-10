"use client";

import { cn } from "@/lib/utils";
import { RoundedImage } from "../shared/rounded-image";
import type { UserProps } from "@/types/user";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedProfileImage: string | null;
}

const ProfilePic: React.FC<ProfileCardProps> = ({
  user,
  className,
  handleProfileImageChange,
  selectedProfileImage,
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <label className="flex gap-2 items-center">
        <RoundedImage
          size={120}
          src={
            selectedProfileImage ||
            user?.profilePic ||
            "/images/blank-profile-picture.png"
          }
          alt={`${user?.username} profile pic`}
          className="border-4 border-white cursor-pointer"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfilePic;
