"use client";

import { cn } from "@/lib/utils";
import { UserProps } from "@/types/user";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { CalendarDays } from "lucide-react";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
}

const UserInfo: React.FC<ProfileCardProps> = ({ user, className }) => {
  return (
    <div className={cn("flex flex-col  justify-between gap-2 px-4", className)}>
      <div className="md:w-[60%] flex gap-2 items-center">
        <div className="flex-1 gap-y-1">
          <h4 className="text-lg font-bold  text-[#262626] capitalize pb-1">
            {user.name}
          </h4>
          <p className="text-xs font-normal  text-[#262626] pb-2">
            {user.username}
          </p>
          <p className="text-xs font-normal  text-[#262626]">{user.user_bio}</p>
        </div>
      </div>

      <div className="flex justify-between max-w-fit gap-6">
        <Link href={user.user_website} className="flex items-center space-x-2">
          <Link2 size={16} className=" text-[#262626]" />
          <p className="text-xs  text-[#262626] font-bold">
            {user.user_website}
          </p>
        </Link>

        <div className="flex items-center space-x-2">
          <CalendarDays size={16} className=" text-[#262626]" />
          <p className="text-xs font-normal  text-[#262626]">
            Joined {user.user_join_date}
          </p>
        </div>
      </div>

      <div className="flex justify-between max-w-fit gap-6">
        <p className="text-xs font-bold  text-[#262626]">
            {user.user_following} <span  className="font-normal"> Following</span>
          </p>
          <div className="border-r"></div>
          <p className="text-xs font-bold text-[#262626]">
          {user.user_followers} <span className="font-normal"> Followers </span>
          </p>
          
        </div>
    </div>
  );
};

export default UserInfo;
