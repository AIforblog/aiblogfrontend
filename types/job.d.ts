import { PostMetrics } from "./post-metrics";
import { UserProps } from "./user";

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
  extra_info: JobExtraInfoProps;
}
