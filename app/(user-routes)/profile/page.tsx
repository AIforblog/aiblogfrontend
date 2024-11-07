import { MoveLeft } from "lucide-react";
import CoverPhoto from "@/components/profile/cover-photo";
import ViewWallet from "@/components/profile/view-wallet";
import EditProfile from "@/components/profile/edit-profile";
import UserInfo from "@/components/profile/user-info";
import ContentTab from "@/components/profile/content-tab";
import makeFetch from "@/lib/helper";
import { assertUserAuthenticated } from "@/lib/auth";
import type { SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";
import { notFound } from "next/navigation";

const getUserProfile = async (accessToken: string, profileId: string) => {
	try {
		const fetchUserProfile = makeFetch<SuccessResponse<UserProps>>(
			"general",
			`/auth/profile/${profileId}`,
			accessToken,
			{
				next: {
					tags: [`profile-${profileId}`],
				},
			},
		);

		return await fetchUserProfile();
	} catch (err) {
		console.error(err);
	}
};

const Profile = async () => {
	const user = await assertUserAuthenticated();
	const userData = await getUserProfile(
		user.accessToken.value as string,
		user.user.profileId as string,
	);
	console.log(user);

	if (!userData) {
		return notFound();
	}

	return (
		<div className="flex flex-col gap-2 maxHeight overflow-hidden">
			<div className="bg-white">
				<div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
					<span>
						<MoveLeft />
					</span>
					Profile
				</div>

				<div className="p-4">
					<CoverPhoto
						user={userData.data}
						token={user.accessToken.value as string}
						profileId={user.user.profileId}
					/>
				</div>

				<div className="flex justify-end gap-2 items-center px-4">
					<EditProfile
						userData={userData.data}
						token={user.accessToken.value as string}
						profileId={user.user.profileId}
					/>
					<ViewWallet />
				</div>

				<div className="rounded-b-lg pb-5">
					<UserInfo user={userData.data} />
				</div>
			</div>

			<div className="bg-white rounded-lg">
				<div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
					<ContentTab />
				</div>
			</div>
		</div>
	);
};

export default Profile;
