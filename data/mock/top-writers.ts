import type { PostMetrics } from "@/types/post-metrics";
import type { UserProps } from "@/types/user";

/**
 * Dummy user data.
 */
const dummyUsers: UserProps[] = [
  {
    name: "Alice Johnson",
    profilePic: "/profile.png",
    // @ts-ignore
    timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
    username: "alice_json",
    coverPhoto: "/cover.jpg",
    id: "28f99936-addf-4767-a87b-0d90369d199c",
    verified: true,
    bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    externalLink: "https://www.linkedin.com/",
    createdAt: "December, 2006",
    followersCount: 118,
    followingCount: 335,
  },
  {
    name: "Alice Johnson",
    profilePic: "/profile.png",
    // @ts-ignore
    timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
    username: "alice_json",
    coverPhoto: "/cover.jpg",
    id: "28f99936-addf-4767-a87b-0d90369d199c",
    verified: true,
    bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    externalLink: "https://www.linkedin.com/",
    createdAt: "December, 2006",
    followersCount: 118,
    followingCount: 335,
  },
  {
    name: "Alice Johnson",
    profilePic: "/profile.png",
    // @ts-ignore
    timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
    username: "alice_json",
    coverPhoto: "/cover.jpg",
    id: "28f99936-addf-4767-a87b-0d90369d199c",
    verified: true,
    bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    externalLink: "https://www.linkedin.com/",
    createdAt: "December, 2006",
    followersCount: 118,
    followingCount: 335,
  },
  {
    name: "Alice Johnson",
    profilePic: "/profile.png",
    // @ts-ignore
    timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
    username: "alice_json",
    coverPhoto: "/cover.jpg",
    id: "28f99936-addf-4767-a87b-0d90369d199c",
    verified: true,
    bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    externalLink: "https://www.linkedin.com/",
    createdAt: "December, 2006",
    followersCount: 118,
    followingCount: 335,
  },
  {
    name: "Alice Johnson",
    profilePic: "/profile.png",
    // @ts-ignore
    timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
    username: "alice_json",
    coverPhoto: "/cover.jpg",
    id: "28f99936-addf-4767-a87b-0d90369d199c",
    verified: true,
    bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    externalLink: "https://www.linkedin.com/",
    createdAt: "December, 2006",
    followersCount: 118,
    followingCount: 335,
  },
];

/**
 * Dummy metrics data.
 */
export const dummyMetrics: PostMetrics[] = [
  {
    likesCount: 1500,
    commentsCount: 300,
    sharesCount: 120,
  },
  {
    likesCount: 2500,
    commentsCount: 450,
    sharesCount: 220,
  },
  {
    likesCount: 3500,
    commentsCount: 600,
    sharesCount: 320,
  },
  {
    likesCount: 4500,
    commentsCount: 750,
    sharesCount: 420,
  },
  {
    likesCount: 5500,
    commentsCount: 900,
    sharesCount: 520,
  },
];

/**
 * Array of top writers with complete props.
 */
const topWriters: any[] = [
  {
    user: dummyUsers[0],
    topic: "Tesla's AI-Powered Transformation in Electric Vehicles",
    metrics: dummyMetrics[0],
    userId: "",
  },

  {
    user: dummyUsers[1],
    topic: "The Digital Detox, Why Unplugging is Essential for Mental Health",
    metrics: dummyMetrics[1],
    userId: "",
  },
  {
    user: dummyUsers[2],
    topic:
      "Finance: Understanding the Basics and Beyond for a Secure Future asdjkfb",
    metrics: dummyMetrics[2],
    userId: "",
  },
  {
    user: dummyUsers[3],
    topic:
      "Travel: Exploring the Hidden Gems of the World and Their Unique Cultures",
    metrics: dummyMetrics[3],
    userId: "",
  },
  {
    user: dummyUsers[4],
    topic:
      "Lifestyle: Embracing Minimalism and Sustainable Living in Modern Society",
    metrics: dummyMetrics[4],
    userId: "",
  },
];

export default topWriters;
