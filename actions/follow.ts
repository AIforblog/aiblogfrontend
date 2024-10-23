"use server";

import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const followAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			followeeId: z.string().uuid(),
		}),
	)
	.handler(async ({ input: { followeeId } }) => {
		const user = await assertUserAuthenticated();
		try {
			const res = await makeFetch(
				"blog",
				`/auth/follow/${followeeId}`,
				user.accessToken,
				{
					method: "POST",
				},
			)();
			console.log(res);
		} catch (err) {
			console.log(err);
		}
		console.log(followeeId);
	});

