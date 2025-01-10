"use client";
import { useUser } from "@/context/userProfilectx";
import BackArrow from "./back-arrow";

function UserProfile() {
  const { user, loading } = useUser();

  return (
    <div className="flex items-center gap-3 mb-6">
      <BackArrow />
      {loading ? (
        // Skeleton loading state
        <div>
          <div className="bg-neutral-300 rounded h-[20px] w-[150px] mb-2 animate-pulse"></div>
          <div className="bg-neutral-200 rounded h-[14px] w-[100px] animate-pulse"></div>
        </div>
      ) : (
        // Actual user profile
        <div>
          <h3 className="text-neutral-900 text-[20px] mb-[-10px]">
            {`${user?.firstName || ""} ${user?.lastName || ""} `}
          </h3>
          <small className="text-xs text-neutral-500">
            {user?.username || ""}
          </small>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
