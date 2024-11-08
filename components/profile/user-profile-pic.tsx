"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RoundedImage } from "../shared/rounded-image";
import type { UserProps } from "@/types/user";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
}

const ProfilePic: React.FC<ProfileCardProps> = ({ user, className }) => {
  const [preview, setPreview] = useState(user.profilePic);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a local preview of the image
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <label className="flex gap-2 items-center">
		
        <RoundedImage
          size={120}
          src={preview}
          alt={`${user.username} profile pic`}
          className="border-4 border-white cursor-pointer"
        />
     
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
	   </label>
    </div>
  );
};

export default ProfilePic;
