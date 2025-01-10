import { MessageSquareText } from "lucide-react";
import UserInfo from "@/components/profile/user-info";
import ContentTab from "@/components/profile/content-tab";
import makeFetch from "@/lib/helper";
import { assertUserAuthenticated } from "@/lib/auth";
import type { SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";
import { notFound } from "next/navigation";

import { CoverImage } from "@/components/profile/cover-image";
import ProfileImageModal from "@/components/profile/modal";
import FollowButton from "@/app/components/follow-button";
import { CheckFollowing } from "@/actions/follow";

import BackArrow from "../../follow/_components/back-arrow";

export type IsFollowingResponse = {
  isFollowing: boolean | PromiseLike<boolean>;
  statusCode: number;
  message: string;
  isFollowedBy?: boolean | boolean | PromiseLike<boolean>;
};

const getUserProfile = async (accessToken: string, userId: string) => {
  try {
    const fetchUserProfile = makeFetch<SuccessResponse<UserProps>>(
      "auth",
      `auth/profile/username/${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      },
    );

    const fetchUser = await fetchUserProfile();
    return fetchUser;
  } catch (err) {
    console.error(err);
  }
};

const checkFollowedBy = async (accessToken: string, followId: string) => {
  try {
    const followedYou = makeFetch<IsFollowingResponse>(
      "auth",
      `auth/is-followed-by/${followId}`,
      accessToken,
      {
        next: {
          tags: [`profile`, "followers", "followees"],
        },
      },
    );

    const fetchFollowed = await followedYou();
    return fetchFollowed.isFollowedBy;
  } catch (err) {
    console.error(err);
  }
};

const getUserBlogs = async (accessToken: string, userId: string) => {
  try {
    const fetchUserBlogs = makeFetch<SuccessResponse<any>>(
      "blog",
      `blog?userId=${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      },
    );

    const fetchBlogs = await fetchUserBlogs();
    return fetchBlogs;
  } catch (err) {
    console.error(err);
  }
};
const getUserJobs = async (accessToken: string, userId: string) => {
  try {
    const fetchUserJobs = makeFetch<SuccessResponse<any>>(
      "blog",
      `blog?userId=${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      },
    );

    const fetchJobs = await fetchUserJobs();
    return fetchJobs;
  } catch (err) {
    console.error(err);
  }
};

const Profile = async ({ params }: { params: { username: string } }) => {
  const user = await assertUserAuthenticated();
  const profileUsername = params.username;
  const userData = await getUserProfile(
    user.accessToken.value as string,
    profileUsername as string,
  );

  const userBlogs = await getUserBlogs(
    user.accessToken.value as string,
    userData?.data.userId as string,
  );

  const userJobs = await getUserJobs(
    user.accessToken.value as string,
    userData?.data.userId as string,
  );

  const isFollowing = await CheckFollowing(
    user.accessToken.value as string,
    userData?.data.userId as string,
  );
  const isFollowsYou = await checkFollowedBy(
    user.accessToken.value as string,
    userData?.data.userId as string,
  );

  if (!userData) {
    return notFound();
  }

  const profileImageSrc = "/images/blank-profile-picture.png";

  return (
    <div className="flex flex-col relative gap-2 maxHeight overflow-y-scroll custom-scroll overflow-x-hidden">
      <div className="">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <span>
            <BackArrow />
          </span>
          Profile
        </div>

        <div className="">
          <div className="w-full h-40 md:h-56 bg-cover bg-center rounded-2xl overflow-hidden">
            {user && (
              <CoverImage
                src={userData.data.coverPic || "/images/cover-photo.jpg"}
                alt={`cover pic`}
              />
            )}
          </div>
          <div className="bottom-12 left-4 flex gap-2 relative md:left-8">
            <ProfileImageModal
              profileImageSrc={userData.data.profilePic || profileImageSrc}
            />
          </div>
        </div>

        <div className="flex justify-end relative bottom-[100px] gap-2 items-center px-4">
          <button className="border rounded-full w-10 h-10 flex justify-center items-center md:hidden">
            <span className="text-3xl leading-none">⋮</span>
          </button>

          <div className="flex items-center gap-4">
            <MessageSquareText className="text-2xl" size={30} />
            <FollowButton
              userId={userData.data.userId}
              isFollowing={isFollowing}
            />
          </div>
        </div>

        <div className="rounded-b-lg pb-5 -top-[70px] relative">
          <UserInfo
            user={userData.data}
            isFolloweBy={isFollowsYou}
            isExternal={true}
          />
        </div>
      </div>
      {/* <div className="rounded-b-lg pb-5 -top-[90px] relative">
        <WalletBalance />
      </div> */}
      <div className="rounded-lg relative -top-[50px]">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <ContentTab
            blogs={userBlogs?.data?.results}
            user={userData.data}
            job={userJobs?.data?.results}
            isFollowing={isFollowing}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
