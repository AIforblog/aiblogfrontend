import { WalletMinimal } from "lucide-react";
import CoverPhoto from "@/components/profile/cover-photo";
import EditProfile from "@/components/profile/edit-profile";
import UserInfo from "@/components/profile/user-info";
import ContentTab from "@/components/profile/content-tab";
import makeFetch from "@/lib/helper";
import { assertUserAuthenticated } from "@/lib/auth";
import type { SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";
import { notFound } from "next/navigation";
import Button from "@/components/shared/button";
import BackArrow from "../follow/_components/back-arrow";
import Link from "next/link";

const getUserProfile = async (accessToken: string, userId: string) => {
  try {
    const fetchUserProfile = makeFetch<SuccessResponse<UserProps>>(
      "general",
      `auth/profile/${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      },
    );

    return await fetchUserProfile();
  } catch (err) {
    console.error(err);
  }
};

const getUserBlogs = async (accessToken: string, userId: string) => {
  try {
    const fetchUserBlogs = makeFetch<SuccessResponse<any>>(
      "blog",
      `blog/?userId=${userId}`,
      accessToken,
      {
        next: {
          tags: [`blog-${userId}`],
        },
      },
    );

    const fetchBlog = await fetchUserBlogs();
    return fetchBlog;
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

const Profile = async () => {
  const user = await assertUserAuthenticated();
  const userData = await getUserProfile(
    user.accessToken.value as string,
    user.userId as string,
  );

  const userBlogs = await getUserBlogs(
    user.accessToken.value as string,
    user.userId as string,
  );
  const userJobs = await getUserJobs(
    user.accessToken.value as string,
    userData?.data.userId as string,
  );

  if (!userData) {
    return notFound();
  }

  return (
    <div className="flex flex-col relative gap-2 maxHeight bg-transparent overflow-y-scroll custom-scroll overflow-x-hidden">
      <div className="">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <span>
            <BackArrow />
          </span>
          Profile
        </div>

        <div className="">
          <CoverPhoto
            user={userData.data}
            token={user.accessToken.value as string}
            userId={user.userId}
          />
        </div>

        <div className="flex justify-end relative bottom-[100px]  gap-2 items-center px-4">
          {/* Pass token , userId , and setUserData */}

          <button className="rounded-full w-10 h-10 flex justify-center items-center md:hidden text-3xl">
            <span className="text-3xl leading-none">...</span>
          </button>

          <EditProfile
            userData={userData.data}
            token={user.accessToken.value as string}
            userId={user?.userId || ""}
          />
          <Link href="/wallet">
            <Button className="border rounded-full md:flex justify-center items-center bg-black hidden">
              <WalletMinimal className="mr-2" />
              View wallet
            </Button>
          </Link>
        </div>

        <div className="rounded-b-lg pb-5 -top-[70px] relative">
          <UserInfo user={userData.data} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
