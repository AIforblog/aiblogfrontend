"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CheckMark from "../../public/images/checkmark.svg";
import Wallet from "../../public/images/wallet_icon.svg";
import { ChevronDownIcon, LinkIcon } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import Button from "../shared/button";
import Link from "next/link";

// User Statistics component
const UserStatistics = () => (
  <div className=" grid grid-cols-3 relative gap-6 mt-4 bg-[#D4D4D4] p-4 rounded-xl">
    <div className="flex flex-col relative items-center text-center bg-white py-4 rounded-lg justify-center">
      <p className="text-lg font-semibold ">120k</p>
      <p className="text-xs text-gray-500">Posts Created</p>
    </div>
    <div className="flex flex-col items-center bg-white  rounded-lg justify-center py-4 text-center">
      <p className="text-lg font-semibold">850</p>
      <p className="text-xs text-gray-500 ">Jobs Completed</p>
    </div>
    <div className="flex flex-col items-center text-center bg-white py-4  rounded-lg justify-center">
      <p className="text-lg font-semibold">3,200ETH</p>
      <p className="text-xs text-gray-500">Earnings</p>
    </div>
  </div>
);

const UserProfile = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);

  const handleBlockUser = () => {
    setIsBlocked(!isBlocked);
    if (isSuspended) setIsSuspended(false); // Reactivate user if suspended when blocking/unblocking
  };

  const handleSuspendUser = () => {
    setIsSuspended(!isSuspended);
    if (isBlocked) setIsBlocked(false); // Unblock user if blocked when suspending/reactivating
  };

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="flex p-0 w-full">
      <Card className="p-6 px-12 border-0 bg-white shadow-lg  flex justify-between items-start gap-8">
        {/* Left side: User profile details */}
        <div className="flex flex-col  gap-4 lg:max-w-[50%]">
          <div className="flex items-start w-full  gap-4">
            <div className="min-h-16 min-w-16  rounded-full overflow-hidden">
              <Image
                src="/blog_image.png"
                alt="Miracle Davison"
                width={1000}
                height={1000}
                className="object-cover h-16 w-16"
              />
            </div>

            <div className="flex flex-col  items-between w-full">
              {/* User profile */}
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-xl text-[#262626]">
                  Miracle Davison
                </h3>
                <Image
                  src={CheckMark}
                  alt="User-verification"
                  width={20}
                  height={20}
                />
              </div>

              <div className="flex items-center gap-16 justify-between">
                <p className="text-[#404040] font-medium">@Mira</p>

                {/* Wallet info */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-transparent border border-[#F5F5F5] px-2 py-1 h-8 rounded-full">
                    <Image
                      src={Wallet}
                      alt="Wallet-icon"
                      width={16}
                      height={16}
                    />
                    <p className="text-center font-normal text-xs text-[#737373]">
                      ***3453
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`px-4 py-2 h-8 flex items-center justify-center text-xs font-normal rounded-full text-white ${
                      isBlocked
                        ? "bg-[#DF3925]"
                        : isSuspended
                          ? "bg-[#EAF03C]"
                          : "bg-[#0E9A54]"
                    }`}
                  >
                    {isBlocked
                      ? "Blocked"
                      : isSuspended
                        ? "Suspended"
                        : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start w-full  gap-4 text-sm mt-1 flex-col">
            <p className="text-sm font-normal text-[#404040] mt-2">
              Miracle is a business owner specializing in digital solutions
              tailored to the tech industry. With a focus on innovation, they
              help businesses enhance their digital.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/"
                className="flex items-center text-blue-600 hover:underline"
              >
                <LinkIcon className="mr-1 h-4 w-4" />
                LinkedIn Profile
              </Link>

              <span className="text-muted-foreground">
                Joined October, 2024
              </span>
            </div>
          </div>
          {/* User statistics component */}
          <UserStatistics />
        </div>

        {/* Right side: Blocking/suspension controls */}
        <div className="flex flex-col ml-12  grow  items-start gap-4">
          <div className="w-full ">
            <label className="block text-gray-600 mb-1 text-sm font-medium">
              Select reason for blocking/suspending user
            </label>
            <Select
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-sm text-start p-2 text-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <SelectValue placeholder="Violating Terms of Service">
                    {selectedValue}
                  </SelectValue>
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </SelectTrigger>
              <SelectContent className="rounded-sm shadow-lg bg-white border border-gray-200 mt-1">
                <SelectItem
                  value="spam"
                  className="p-2 hover:bg-gray-100"
                  onSelect={() => setSelectedValue("Spam")}
                >
                  Spam
                </SelectItem>
                <SelectItem
                  value="Harassment"
                  className="p-2 hover:bg-gray-100"
                  onSelect={() => setSelectedValue("Harassment")}
                >
                  Harassment
                </SelectItem>
                <SelectItem
                  value="Inappropriate Content"
                  className="p-2 hover:bg-gray-100"
                  onSelect={() => setSelectedValue("Inappropriate Content")}
                >
                  Inappropriate Content
                </SelectItem>
                <SelectItem
                  value="Violating Terms of Service"
                  className="p-2 hover:bg-gray-100"
                  onSelect={() =>
                    setSelectedValue("Violating Terms of Service")
                  }
                >
                  Violating Terms of Service
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mt-2">
            <Button
              onClick={handleBlockUser}
              className={`${
                isBlocked ? "bg-[#0E9A54]" : "bg-[#DF3925]"
              } text-white px-4 py-2 rounded-full`}
            >
              {isBlocked ? "Unblock User" : "Block User"}
            </Button>
            <Button
              onClick={handleSuspendUser}
              className={`${
                isSuspended ? "bg-[#0E9A54]" : "bg-[#EAF03C] hover:bg-[#EAF03C]"
              } text-white px-4 py-2 rounded-full`}
            >
              {isSuspended ? "Reactivate User" : "Suspend User"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
