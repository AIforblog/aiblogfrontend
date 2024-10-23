import { TrendingTopics } from "@/app/(user)/sections";
import { SectionTitle } from "@/components/shared";
import TaskCard from "@/components/shared/task-card";
import ProfileCard from "@/components/shared/user-profile-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDummyData } from "@/data/mock/job";
import { dummyUsers } from "@/data/mock/top-writers";
import { UserData } from "@/data/mock/user";
import { cn } from "@/lib/utils";
import BackArrow from "./back-arrow";

const FollowersPage = () => {
	const tabs = ["followers", "following", "verified"];
	const user = UserData;

	return (
		<main className="font-dm-sans grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] max-w-[1440px] mx-auto w-full md:px-4 h-screen md:overflow-hidden">
			<ScrollArea className="bg-white py-8 px-4">
				<div className="flex items-center gap-3 mb-6">
					<BackArrow />
					<div>
						<h3 className="text-neutral-900 text-[20px] mb-[-10px]">
							{user.name}
						</h3>
						<small className="text-xs text-neutral-500">{user.username}</small>
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
								value={tab}
								key={tab}
							>
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map((tab) => (
						<TabsContent value={tab} key={tab} className="pt-4">
							<div className="flex flex-col gap-4">
								{dummyUsers.map((user) => (
									<Card className="flex flex-col gap-5" key={user.userId}>
										<CardHeader>
											<ProfileCard
												user={user}
												following={tab === "following"}
											/>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-neutral-700">
												lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
												ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
												lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
											</CardDescription>
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</ScrollArea>
			<div className="py-4 px-4 md:px-0 flex-col gap-6 h-full overflow-hidden hidden md:flex">
				<ScrollArea className="flex-1">
					<div className="pr-4">
						<SectionTitle
							title="Trending Topics"
							className="text-neutral-600 text-xl mb-4 sticky top-0 bg-neutral-50"
						/>
						<TrendingTopics />
					</div>
				</ScrollArea>
				<ScrollArea className="flex-1">
					<div className="pr-4">
						<SectionTitle
							title="Trending Jobs"
							className="text-neutral-600 text-xl mb-4 sticky top-0 bg-neutral-50"
						/>
						<div className="flex flex-col gap-4">
							{JobDummyData.map((job) => (
								<TaskCard key={job.user.userId} job={job} />
							))}
						</div>
					</div>
				</ScrollArea>
			</div>
		</main>
	);
};

export default FollowersPage;
