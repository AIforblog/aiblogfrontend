"use server";
import makeFetch from "@/lib/helper";
import { authenticatedAction } from "@/lib/safe-action";
import { createBlogSchema } from "@/schemas/blog";
import type { SuccessResponse } from "@/types/api";
import type { Blog } from "@/types/blog";
import { z } from "zod";

export async function saveToDraft() {
	console.log("Saved");
}

type CreatedBlog = Omit<Blog, "coverImage" | "tags"> & {
	// Would change later, don't know what it is returning
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	video?: any;
	userId: string;
	tags: string[];
	thumbnail: string;
	id: string;
};

export const postBlogAction = authenticatedAction
	.createServerAction()
	.input(
		createBlogSchema.extend({
			fileWrapper: z.instanceof(FormData),
		}),
	)
	.handler(
		async ({
			input: { title, content, fileWrapper, tags, category },
			ctx: { user },
		}) => {
			try {
				const coverImageFile = fileWrapper.get("file") as File;
				if (!coverImageFile) {
					throw new Error("No cover image provided.");
				}

				const buffer = await coverImageFile.arrayBuffer();
				const base64Str = Buffer.from(buffer).toString("base64");

				const accessToken = user.accessToken.value as string;

				const thumbnail = `data:${coverImageFile.type};base64,${base64Str}`;

				const response = await makeFetch<SuccessResponse<CreatedBlog>>(
					"blog",
					"/posts",
					accessToken as string,
					{
						method: "POST",
						body: {
							title,
							content,
							status: "published",
							category,
							topics: tags.split(","),
							thumbnail,
							featured: false,
						},
					},
				)();

				return response; // Return response on success
			} catch (err) {
				console.error("Error in blog post action:", err);
				throw err; // Ensure the error is propagated to onError
			}
		},
	);
