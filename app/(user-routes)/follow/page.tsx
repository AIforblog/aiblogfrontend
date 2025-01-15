import { TopWriters, TrendingTopics } from "@/app/(user)/sections";
import { SectionTitle } from "@/components/shared";
import ProfileCard from "@/components/shared/user-profile-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import { cn } from "@/lib/utils";

import { getFollowees, getFollowers, isFollowing } from "./queries";
import type { UserProps } from "@/types/user";
import type { SuccessResponse, ErrorResponse } from "@/types/api";

import UserProfile from "./_components/userProfile";
import { assertUserAuthenticated } from "@/lib/auth";
import { Suspense } from "react";

const FollowersPage = async () => {
  const user = await assertUserAuthenticated();
  const [followers, followees] = await Promise.all([
    getFollowers(user.userId),
    getFollowees(user.userId),
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

  return (
    <main className="font-dm-sans grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] max-w-[1440px] mx-auto w-full md:px-4 h-screen md:overflow-hidden">
      <ScrollArea className="bg-white py-8 px-4">
        <UserProfile />
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
      </ScrollArea>
      <section className="hidden md:block col-span-1">
            <div
              className={`h-[88vh] grid ${
                user.userId ? "grid-rows-2" : "grid-rows-3"
              } gap-y-6 overflow-hidden`}
            >
              <section className="row-span-1 overflow-hidden">
                <SectionTitle title="Trending Topics" />
                 <Suspense fallback={<div>loading........</div>}> 
                <TrendingTopics />
                </Suspense>
              </section>

              <section
                className={`${
                  user ? "row-span-2" : "row-span-1"
                }`}
              >
                <SectionTitle title="Top Writers" />
                <Suspense fallback={<div>loading........</div>}> 
                <TopWriters />
                </Suspense>
              </section>
            </div>
          </section>
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

      return {
        ...user,
        isFollowing: isFollowingStatus,
        name: `${user.firstName} ${user.lastName}`,
      };
    }),
  );

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
