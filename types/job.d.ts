import type { PostMetrics } from "./post-metrics";
import type { UserProps } from "./user";

export enum CustomOptions {
  Custom = "Custom",
  Advanced = "Advanced",
  Normal = "Normal",
}

export interface JobExtraInfoProps {
  repliesCount: number;
  customOption: "Custom" | "Advanced";
  normalStrings: string[];
}

export interface JobType {
  user: UserProps;
  title: string;
  description: string;
  content: string;
  date: string;
  metrics: PostMetrics;
  status: "available" | "coming soon";
  extra_info: JobExtraInfoProps;
}

export type APIJobType = {
  title: string;
  description: string;
  startDate: string; // 2024-10-30
  endDate: string; // 2024-10-30
  reward: number;
  maxParticipants: number;
  status: "published" | "draft";
  engagementLevel: "low" | "high" | "medium";
  instruction: string;
  socialActions: Array<{
    socialLink: string;
    actions: "share" | "comment" | "like" | "follow";
    id: string;
    createdAt: string;
  }>;
  customActions: Array<{
    questionText: string;
    actionType: string;
    checkboxChoices: string[];
    id: string;
    createdAt: string;
  }>;
  id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  likes: number;
  comments: number;
};

export type APIJobCommentType = {
  id: string;
  content: string;
  userId: string;
  username: string;
  profilePic: string;
  jobId: string;
  createdAt: string;
  replies: Array<APIJobCommentType>;
};
