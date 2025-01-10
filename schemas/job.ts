import { z } from "zod";

export const SOCIAL_ACTION_TYPES = [
  "like",
  "comment",
  "follow",
  "share",
] as const;
export const CUSTOM_ACTION_TYPES = [
  "checkbox",
  "text",
  "media",
  "link",
] as const;

export const jobFormSchema = z
  .object({
    jobTitle: z
      .string()
      .min(2, { message: "Job title must be at least 2 characters." }),
    startDate: z.date({ message: "Start date is required." }),
    endDate: z.date({ message: "End date is required." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    rewardPerParticipant: z
      .number()
      .gt(0, { message: "Reward per participant must be greater than 0 ETH." }),

    maxParticipants: z
      .number()
      .min(1, { message: "At least one participant is required." }),
    engagementLevel: z
      .string()
      .min(1, { message: "Engagement level is required." }),

    instructionField: z
      .string()
      .min(1, { message: "Instruction is required." }),
    socialActions: z.array(
      z.object({
        socialLink: z
          .string()
          .min(1, "Social link is required")
          .transform((v) =>
            v.toLocaleLowerCase().startsWith("http")
              ? v.toLocaleLowerCase()
              : "https://" + v.toLocaleLowerCase(),
          ),
        actions: z
          .array(z.enum(SOCIAL_ACTION_TYPES))
          .min(1, "Actions are required"),
      }),
    ),
    customActions: z.array(
      z.union([
        z.object({
          questionText: z.string().min(1, { message: "Question is required" }),
          actionType: z.literal("media"),
        }),
        z.object({
          questionText: z.string().min(1, { message: "Question is required" }),
          actionType: z.literal("checkbox"),
          checkboxChoices: z.array(z.string()),
        }),
        z.object({
          questionText: z.string().min(1, { message: "Question is required" }),
          actionType: z.literal("text"),
          answer: z.string().min(1, { message: "Answer is required" }),
        }),
        z.object({
          questionText: z.string().min(1, { message: "Question is required" }),
          actionType: z.literal("link"),
          link: z.string(),
        }),
      ]),
    ),
  })
  .refine(
    (data) => data.customActions.length > 0 || data.socialActions.length > 0,
    {
      message: "Social actions or Custom actions is required",
      path: ["customActions"],
    },
  );

export type JobFormSchema = z.infer<typeof jobFormSchema>;
