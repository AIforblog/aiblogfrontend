import { cn } from "@/lib/utils";
import Image from "next/image";
import type { UserProps } from "@/types/user";
import { Button } from "@/components/ui/button";
import { PencilLine } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfilePicProps {
  user: UserProps;
  className?: string;
  selectedProfileImage: string | null;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewClick: () => void;
  onEditClick: () => void;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  user,
  className,
  selectedProfileImage,
  onViewClick,
  onEditClick,
}) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
        <Image
          src={selectedProfileImage || user?.profilePic || "/images/blank-profile-picture.png"}
          alt={`${user?.username} profile pic`}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full"
          >
            <PencilLine size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onViewClick}>
            View Profile Picture
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onEditClick}>
            Edit Profile Picture
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfilePic;

