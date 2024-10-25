"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserProps } from "@/types/user";
import { CoverImage } from "./cover-image";
import { PencilLine } from 'lucide-react';
import ProfilePic from "./user-profile-pic";
import { UserData } from "@/data/mock/user";

interface CoverPhotoProps {
  user: UserProps; 
  className?: string; 
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ user, className }) => {
  
  // Action to handle when the user clicks to change the cover photo
  const changePhotoAction = async () => {
    console.log("Change cover photo clicked!");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="w-full h-40 md:h-56 bg-cover bg-center rounded-2xl overflow-hidden">
        <CoverImage
         src={user.cover_photo}
          alt={`${user.username} cover pic`}
        />
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          onClick={changePhotoAction}
          className="bg-[#171717] hover:bg-[#404040] text-[#FAFAFA] font-medium rounded-full transition duration-300 ease-in-out"
        >
         <PencilLine />
        </Button>
      </div>
      <div className="absolute -bottom-12 left-8 flex gap-2">
     <ProfilePic user={UserData}/>
      </div>

    </div>
  );
};

export default CoverPhoto;
