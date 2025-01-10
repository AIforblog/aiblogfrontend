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
  isFolloweBy?: boolean;
  isExternal?: boolean;
}

const UserInfo: React.FC<ProfileCardProps> = ({
  user,
  className,
  isFolloweBy,
  isExternal,
}) => {
  const DateJoined = formatJoinDate(user?.createdAt);
  return (
    <div className={cn("flex flex-col  justify-between gap-2 px-4", className)}>
      <div className="md:w-[70%] flex gap-2 mb-3 items-center">
        <div className="flex-1 gap-y-1">
          <h4 className="text-lg font-bold  capitalize pb-1">
            {user?.firstName || user?.firstName
              ? `${user?.firstName} ${user?.lastName} `
              : "Your Full Name"}
          </h4>
          <p className="text-xs font-normal mb-3 mt-1 pb-2 flex items-center gap-2">
            @{user?.username}{" "}
            {isFolloweBy && (
              <span className=" text-[10px] p-[4px] leading-tight rounded-sm">
                follows you
              </span>
            )}
          </p>
          <p className="text-xs font-normal  ">{user?.bio}</p>
        </div>
      </div>

      <div className="flex justify-between max-w-fit gap-6">
        {user?.externalLink && (
          <a
            href={user.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 md:text-xs cursor-pointer font-bold text-[9px]"
          >
            <Link2 size={16} className=" mr-2" />
            {user?.externalLink}
          </a>
        )}

        <div className="flex items-center space-x-2">
          <CalendarDays size={10} className="  " />
          <p className="md:text-xs text-[9px] font-normal  ">
            Joined {DateJoined}
          </p>
        </div>
      </div>

      <div className="flex justify-start  gap-4 my-3">
        <Link
          href={!isExternal ? "/follow" : `/profile/${user.username}/follow`}
          className="text-xs font-bold flex items-center gap-2  "
        >
          {user?.followingCount} <span className="font-normal"> Following</span>
        </Link>
        {/* <Separator /> */}
        <span className="w-2 h-full bg-white/30" />
        <Link
          href={!isExternal ? "/follow" : `/profile/${user.username}/follow`}
          className="text-xs font-bold flex items-center gap-2 "
        >
          {user?.followersCount}{" "}
          <span className="font-normal"> Followers </span>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
