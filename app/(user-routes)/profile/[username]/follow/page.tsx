import ProfileCard from "@/components/shared/user-profile-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import type { UserProps } from "@/types/user";
import type { SuccessResponse, ErrorResponse } from "@/types/api";

import { assertUserAuthenticated } from "@/lib/auth";
import {
  getFollowees,
  getFollowers,
  isFollowing,
} from "@/app/(user-routes)/follow/queries";
import makeFetch from "@/lib/helper";
import BackArrow from "./_components/back-arrow";

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

const FollowersPage = async ({ params }: { params: { username: string } }) => {
  console.log(params, "external follow");
  const profileUsername = params.username;
  const user = await assertUserAuthenticated();
  const userData = await getUserProfile(
    user.accessToken.value as string,
    profileUsername as string,
  );

  const [followers, followees] = await Promise.all([
    getFollowers(userData?.data.userId),
    getFollowees(userData?.data.userId),
  ]);

  const tabs = [
    {
      title: "followers",
      data: followers,
    },
    {
      title: "following",
      data: followees,
    },
    {
      title: "verified",
      data: followers,
    },
  ];

  console.log(followers, followees);

  return (
    <main className="font-dm-sans   mx-auto w-full md:px-4 h-screen md:overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <BackArrow />
        <div>
          <h3 className="text-neutral-900 text-[20px] mb-[-10px]">
            {`${userData?.data.firstName || ""} ${
              userData?.data.lastName || ""
            } `}
          </h3>
          <small className="text-xs text-neutral-500">
            {userData?.data.username || ""}
          </small>
        </div>
      </div>
      <Tabs defaultValue="followers">
        <TabsList className="flex gap-4 md:gap-7 w-full bg-transparent border-b-[2px] py-6 rounded-none justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              className={cn(
                "!shadow-none bg-transparent rounded-none capitalize text-neutral-500 relative",
                "after:absolute after:content-[''] after:h-1 after:w-full after:bg-[#fdc316] after:bottom-[-10px]",
                "after:rounded-t-md after:rounded-b-none",
                "after:transition-all after:duration-300 after:ease-in-out",
                "after:opacity-0 after:scale-x-0",
                "data-[state=active]:after:opacity-100 data-[state=active]:after:scale-x-100",
              )}
              value={tab.title}
              key={tab.title}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.title} key={tab.title} className="pt-4">
            <div className="flex flex-col gap-4">
              {renderTabContent(tab.data, tab.title)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

async function renderTabContent(
  data: SuccessResponse<UserProps[]> | ErrorResponse | undefined,
  tabTitle: string,
) {
  if (!data) {
    return <p>Error: No data available</p>;
  }

  if ("error" in data) {
    return <p>Error: {data.message}</p>;
  }

  if (data.statusCode === 404) {
    return (
      <p>
        {tabTitle === "followers"
          ? "You don't have any followers"
          : tabTitle === "following"
            ? "You are not following any users"
            : "You don't have any verified followers"}
      </p>
    );
  }

  // Ensure all `isFollowing` calls are resolved for each user
  const usersWithFollowStatus = await Promise.all(
    data.data.map(async (user) => {
      const isFollowingStatus = await isFollowing(user.userId);
      console.log(isFollowingStatus);
      return {
        ...user,
        isFollowing: isFollowingStatus,
        name: `${user.firstName} ${user.lastName}`,
      };
    }),
  );
  console.log(usersWithFollowStatus);

  return usersWithFollowStatus.map((user) => (
    <Card className="flex flex-col" key={user.id}>
      <CardHeader>
        <ProfileCard user={user} isFollowing={user.isFollowing} />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-neutral-700">
          {user.bio}
        </CardDescription>
      </CardContent>
    </Card>
  ));
}

export default FollowersPage;
