import React from "react";
import { MoveLeft } from "lucide-react";
import CoverPhoto from "@/components/profile/cover-photo";
import { UserData } from "@/data/mock/user";
import ViewWallet from "@/components/profile/view-wallet";
import EditProfile from "@/components/profile/edit-profile";
import UserInfo from "@/components/profile/user-info";
import ContentTab from "@/components/profile/content-tab";

const Profile = () => {
  return (
    <div className="flex flex-col gap-2 maxHeight overflow-hidden">
      <div className="bg-white">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          {" "}
          <span>
          <MoveLeft />
          </span>
          Profile
        </div>

        <div className="p-4">
          <CoverPhoto user={UserData} />
        </div>

        <div className="flex justify-end gap-2 items-center px-4 ">
          <ViewWallet />
          <EditProfile />
        </div>

        <div className=" rounded-b-lg pb-5">
          <UserInfo user={UserData}/>
        </div>
      </div>

    <div className="bg-white rounded-lg">
    <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <ContentTab/>
        </div>
    </div>
    </div>
  );
};

export default Profile;
