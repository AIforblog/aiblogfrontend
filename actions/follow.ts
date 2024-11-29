"use server";

import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const action = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			followeeId: z.string(),
			path: z.string(),
		}),
	)
	.handler(async ({ input: { followeeId, path } }) => {
		type Success = {
			message: string;
		};
		const user = await assertUserAuthenticated();
		console.log()
		const followUser = makeFetch<Success>(
			"auth",
			`auth/${path}/${followeeId}`,
			user.accessToken.value,
			{
				method: "POST",
				next: {
               tags: ['profile' , "followers", "followees"],
        }
			},
		);
		console.log(followUser)
		try {

			return await followUser();

		} catch (err) {
			console.log(err);
		}
		console.log(followeeId);
	});

// export const unfollowAction = authenticatedAction
// 	.createServerAction()
// 	.input(
// 		z.object({
// 			followeeId: z.string().uuid(),
// 		}),
// 	)
// 	.handler(async ({ input: { followeeId } }) => {
// 		const user = await assertUserAuthenticated();
// 		const followUser = makeFetch(
// 			"auth",
// 			`/auth/follow/${followeeId}`,
// 			user.accessToken.value,
// 			{
// 				method: "POST",
// 			},
// 		);
// 		try {
// 			return await followUser();
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		console.log(followeeId);
// 	});


export type IsFollowingResponse = {
  isFollowing: boolean | PromiseLike<boolean>;
	statusCode: number;
	message: string;
};


export const CheckFollowing = async (accessToken: string, userId: string): Promise<boolean> => {
  try {
    const fetchUserProfile = makeFetch<IsFollowingResponse>(
      "auth",
      `auth/is-following/${userId}`,
      accessToken,
       {
        next: {
          tags: [`profile-${userId}`],
        },
      }
    );

    const response = await fetchUserProfile();
    
    return response.isFollowing; 
  } catch (err) {
    console.error(err);
    return false; 
  }
};
