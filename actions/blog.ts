"use server";

import { BLOG_API_BASE_URL } from "@/lib/constants";
import makeFetch from "@/lib/helper";
import { authenticatedAction } from "@/lib/safe-action";
import { createBlogSchema } from "@/schemas/blog";
import { z } from "zod";

export async function saveToDraft() {
	console.log("Saved");
}

export const postBlogAction = authenticatedAction
	.createServerAction()
	.input(
		createBlogSchema.extend({
			fileWrapper: z.instanceof(FormData),
		}),
	)
	.handler(
		async ({ input: { title, content, fileWrapper, tags }, ctx: { user } }) => {
			const coverImageFile = fileWrapper.get("file") as File;
			const buffer = Buffer.from(await coverImageFile.arrayBuffer());
			const base64Str = buffer.toString("base64");

			const accessToken = user.accessToken;
			console.log("accessToken", BLOG_API_BASE_URL);

			makeFetch("blog", "/posts", accessToken, {
				method: "POST",
				body: {
					title,
					content,
					status: "published",
					topics: tags.split(","),
					thumbnail: base64Str,
					featured: false,
				},
			})()
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});
		},
	);
