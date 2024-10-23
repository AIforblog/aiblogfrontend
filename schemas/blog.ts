import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const createBlogSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(165, "Title can't be more than 165 characters"),
	content: z.string().min(1, "Content is required"),
	tags: z.string().min(1, "Tags is required"),
	category: z.string().min(1, "Category is required"),
	status: z.string().default("published"),
	coverImage: z
		.instanceof(File)
		.refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
		.refine(
			(file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
			"Only .jpg, .png, and .webp formats are supported.",
		)
		.optional(),
});
