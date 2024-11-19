"use server";

import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const action = authenticatedAction

  .createServerAction()
  .input(
    z.object({
      followeeId: z.string().uuid(),
      path: z.string(),
    })
  )
  .handler(async ({ input: { followeeId, path } }) => {
    type Success = {
      message: string;
    };

    const user = await assertUserAuthenticated();
    const followUser = makeFetch<Success>(
      "auth",
      `/auth/${path}/${followeeId}`,
      user.accessToken.value,
      {
        method: "POST",
      }
    );
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
