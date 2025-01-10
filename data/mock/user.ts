import type { UserProps } from "@/types/user";

export const UserData: UserProps = {
  username: "@mira",
  profilePic: "/profile.png",
  name: "Miracle Davison",
  // @ts-ignore
  timestamp: Date.now() - 1000 * 60 * 5, // THis isn't in the user object.
  coverPhoto: "/cover.jpg",
  verified: true,
  bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
  externalLink: "https://www.linkedin.com/",
  createdAt: "December, 2006",
  followersCount: 118,
  followingCount: 335,
  id: "",
};
