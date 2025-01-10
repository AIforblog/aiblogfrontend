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

    const followUser = makeFetch<Success>(
      "auth",
      `auth/${path}/${followeeId}`,
      user.accessToken.value,
      {
        method: "POST",
        next: {
          tags: ["profile", "followers", "followees"],
        },
      },
    );

    try {
      return await followUser();
    } catch (err) {
      console.log(err);
    }
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
  isFollowedBy?: boolean;
};

export const CheckFollowing = async (
  accessToken: string,
  userId: string,
): Promise<boolean> => {
  try {
    const fetchUserProfile = makeFetch<IsFollowingResponse>(
      "auth",
      `auth/is-following/${userId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${userId}`],
        },
      },
    );

    const response = await fetchUserProfile();

    return response.isFollowing;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const checkFollowedBy = async (
  accessToken: string,
  followId: string,
) => {
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
