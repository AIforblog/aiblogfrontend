import { UserData } from "./user";
import { dummyMetrics } from "./top-writers";
import { JobType } from "@/types/job";

const JobData: JobType = {
  user: UserData,
  title: "Tesla's AI-Powered Transformation in Electric Vehicles",
  description:
    "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
  content:
    "In the ever-evolving business landscape, where volatile markets and burgeoning technologies perpetually redefine the game, one steadfast titan has consistently outstripped the competition. Legacy Ltd, a bastion of industry whose name has become synonymous with sustainable success, has mastered the art of leveraging data-driven strategies to fuel its growth. Herein lies an exploration of the profound and intricate strategies that Legacy Ltd employs, strategies that exemplify the potency of data as the lifeblood of modern business acumen.",
  metrics: dummyMetrics[2],
  date: "2024-10-11T20:59:46",
  extra_info: {
    repliesCount: 12,
    customOption: "Custom",
    normalStrings: ["Nigeria"],
  },
};

export const JobDummyData = [
  JobData,
  JobData,
  JobData,
  JobData,
  JobData,
  JobData,
];
