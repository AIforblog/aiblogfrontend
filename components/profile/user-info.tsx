"use client";

import { cn } from "@/lib/utils";
import type { UserProps } from "@/types/user";
import { Link2 } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { formatJoinDate } from "@/lib/helper";
import Link from "next/link";

interface ProfileCardProps {
  user: UserProps;
  isJobProfile?: boolean;
  className?: string;
}



const UserInfo: React.FC<ProfileCardProps> = ({ user, className }) => {
  const DateJoined = formatJoinDate(user?.createdAt);
  return (
    <div className={cn("flex flex-col  justify-between gap-2 px-4", className)}>
      <div className="md:w-[70%] flex gap-2 mb-3 items-center">
        <div className="flex-1 gap-y-1">
          <h4 className="text-lg font-bold  text-[#262626] capitalize pb-1">
            { user?.firstName || user?.firstName ? `${user?.firstName} ${user?.lastName} ` : "Your Full Name"}
          </h4>
          <p className="text-xs font-normal mb-3 mt-1 text-[#262626] pb-2">
            @{user?.username}
          </p>
          <p className="text-xs font-normal  text-[#262626]">
            {user?.bio}
          </p>
        </div>
      </div>

      <div className="flex justify-between max-w-fit gap-6">
        {(user?.externalLink) && (
          <a
            href={user.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 md:text-xs cursor-pointer text-[#262626] font-bold text-[9px]"
          >
            <Link2 size={16} className="text-[#262626] mr-2" />
            {user?.externalLink}
          </a>
        )}

        <div className="flex items-center space-x-2">
          <CalendarDays size={10} className=" text-[#262626]" />
          <p className="md:text-xs text-[9px] font-normal  text-[#262626]">
            Joined {DateJoined}
          </p>
        </div>
      </div>

      <div className="flex justify-start  gap-4 my-3">
        <Link href="/follow" className="text-xs font-bold flex items-center gap-2  text-[#262626]">
          {user?.followingCount} <span className="font-normal"> Following</span>
        </Link>
        {/* <Separator /> */}
        <span className="w-2 h-full bg-white/30" />
        <Link href="/follow" className="text-xs font-bold flex items-center gap-2 text-[#262626]">
          {user?.followersCount} <span className="font-normal"> Followers </span>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
