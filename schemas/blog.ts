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
      "Only .jpg, .png, and .webp formats are supported."
    )
    .optional(),
});

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z
    .any() // Using any instead of instanceof File
    .optional()
    .refine((file) => {
      if (!file) return true; // Skip validation if no file
      // Check if it's a File object (client-side) or a valid file-like object (server-side)
      return (
        (typeof window !== "undefined" && file instanceof File) ||
        (typeof file === "object" &&
          "name" in file &&
          "size" in file &&
          "type" in file)
      );
    }, "Invalid file format"),
  isDraft: z.boolean().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;
