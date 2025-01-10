// // Define the article interface
// interface Article {
//     id: number;
//     author: string;
//     authorImage: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     likes: number;
//     comments: number;
//     shares: number;
//     tags: string[];
//     timePosted: string;
//     isFollowing: boolean;
//     location: string;
//   }

//   // Mock data for articles
//   const articles: Article[] = [
//     {
//       id: 1,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg", // Author image URL
//       title: "Tesla's AI-Powered Transformation in Electric Vehicles",
//       description: "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
//       imageUrl: "/images/car.png", // Article image URL
//       likes: 15000,
//       comments: 3500,
//       shares: 5000,
//       tags: ["Web3", "Nigeria"],
//       timePosted: "3 hrs ago",
//       isFollowing: true,
//       location: "Nigeria",
//     },
//     {
//       id: 2,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "The Digital Detox: Why Unplugging is Essential",
//       description: "Discover the importance of unplugging for mental health and how digital detox can lead to a more fulfilling lifestyle.",
//       imageUrl: "/images/car.png",
//       likes: 1200,
//       comments: 2900,
//       shares: 4300,
//       tags: ["Health", "Lifestyle"],
//       timePosted: "3 hrs ago",
//       isFollowing: true,
//       location: "Nigeria",
//     },
//     {
//       id: 3,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "Exploring AI in Healthcare: The Future of Medicine",
//       description: "An in-depth look at how AI is revolutionizing healthcare, from predictive diagnosis to personalized treatment.",
//       imageUrl: "/images/car.png",
//       likes: 1600,
//       comments: 3300,
//       shares: 4800,
//       tags: ["AI", "Healthcare"],
//       timePosted: "4 hrs ago",
//       isFollowing: false,
//       location: "Global",
//     },
//     {
//       id: 4,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "Sustainable Energy Solutions: AI's Role in Green Tech",
//       description: "How artificial intelligence is driving innovation in green technology and contributing to sustainable energy solutions.",
//       imageUrl: "/images/car.png",
//       likes: 1400,
//       comments: 3100,
//       shares: 4500,
//       tags: ["AI", "GreenTech"],
//       timePosted: "5 hrs ago",
//       isFollowing: false,
//       location: "Nigeria",
//     }
//   ];

//   export default articles;
import type { BlogType } from "@/types/blog";
import { UserData } from "./user";
import { dummyMetrics } from "./top-writers";

const BlogData: BlogType = {
  user: UserData,
  title: "Tesla's AI-Powered Transformation in Electric Vehicles",
  id: "002",
  image: "/blog_image.png",
  description:
    "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
  metrics: dummyMetrics[0],
  extra_info: ["Nigeria", "Web3", "Crypto"],
  publishedDate: "2024-03-15",
  content: [
    {
      type: "paragraph",
      text: "In the ever-evolving business landscape, where volatile markets and burgeoning technologies perpetually redefine the game, one steadfast titan has consistently outstripped the competition: Legacy Ltd, a bastion of industry whose name has become synonymous with sustainable success, has mastered the art of leveraging data-driven strategies to fuel its growth. Herein lies an exploration of the profound and intricate strategies that Legacy Ltd employs, strategies that exemplify the potency of data as the lifeblood of modern business acumen.",
    },
    {
      type: "subtitle",
      text: "The Forefront of Analytical Excellence",
    },
    {
      type: "paragraph",
      text: "Legacy Ltd stands as a paragon of innovation, utilizing a diverse array of data analytics tools to dissect the fabric of their market. Witness here the tools that beget business intelligence:",
    },
    {
      type: "list",
      items: [
        "Advanced Predictive Analytics: Enabling the forecasting of market trends, and consumer behavior.",
        "Customer Data Platforms (CDP): Aggregating and organizing customer data across multiple touchpoints.",
        "Artificial Intelligence (AI): Empowering decision-making with algorithms of inconceivable sophistication.",
      ],
    },
    {
      type: "paragraph",
      text: "Each tool serves as a cog in the vast machinery of Legacy Ltd's analytical prowess. Their analysts, like modern-day oracles, interpret the tapestry of data to unveil patterns unseen to the unaided eye.",
    },
    {
      type: "image-gallery",
      images: [
        "/images/data-driven-blog/image-1.jpg",
        "/images/data-driven-blog/image-2.jpg",
        "/images/data-driven-blog/image-3.jpg",
        "/images/data-driven-blog/image-4.jpg",
      ],
    },
    {
      type: "subtitle",
      text: "Deciphering the Consumer Enigma",
    },
    {
      type: "paragraph",
      text: "Fathom the complexity of human desire; it is as capricious as the wind, as intricate as a spider's web. Yet, in this maelstrom of unpredictability, Legacy Ltd has found structure and predictability. By collecting extensive consumer data, the company discerns patterns in the cacophony of the marketplace:",
    },
    {
      type: "list",
      items: [
        "Purchase Behavior reveals the arcana of consumer needs and the rhythm of repeat business.",
        "Engagement Metrics illuminate the efficacy of marketing campaigns.",
        "Sentiment Analysis gauges the emotional pulse of the consumer populace.",
      ],
    },
    {
      type: "paragraph",
      text: "These insights are the crucible in which strategic decisions are born, allowing Legacy Ltd to not just react to customer trends, but to preempt them.",
    },
    {
      type: "subtitle",
      text: "Operational Optimization: The Forge of Efficiency",
    },
    {
      type: "paragraph",
      text: "Picture the complexity of a corporate ecosystem. There is a dance, a delicate ballet, where every motion, every step influences the next. Legacy Ltd harnesses data to choreograph this performance, employing:",
    },
    {
      type: "list",
      items: [
        "Predictive Maintenance to preclude machine downtime.",
        "Supply Chain Analytics to fortify the sinews of distribution.",
        "Real-Time Data Monitoring to maintain the ceaseless flow of commerce.",
      ],
    },
    {
      type: "paragraph",
      text: "In this grand orchestration, data conducts the symphony of business operations, ensuring that every note resonates with precision and purpose.",
    },
  ],
};

const dataDrivernGrowthBlog: BlogType = {
  user: { ...UserData, name: "Miracle Davison" },
  id: "001",
  title:
    "Data-Driven Growth - How Legacy Ltd Harnesses Insights for Business Success",
  image: "/images/data-driven-blog/headImage.jpg",
  description:
    "In the ever-evolving business landscape, where volatile markets and burgeoning technologies perpetually redefine the game, one steadfast titan has consistently outstripped the competition: Legacy Ltd, a bastion of industry whose name has become synonymous with sustainable success.",
  metrics: dummyMetrics[0],
  extra_info: ["USA", "Business", "Marketing"],
  publishedDate: "2024-03-15",
  content: [
    {
      type: "paragraph",
      text: "In the ever-evolving business landscape, where volatile markets and burgeoning technologies perpetually redefine the game, one steadfast titan has consistently outstripped the competition: Legacy Ltd, a bastion of industry whose name has become synonymous with sustainable success, has mastered the art of leveraging data-driven strategies to fuel its growth. Herein lies an exploration of the profound and intricate strategies that Legacy Ltd employs, strategies that exemplify the potency of data as the lifeblood of modern business acumen.",
    },
    {
      type: "subtitle",
      text: "The Forefront of Analytical Excellence",
    },
    {
      type: "paragraph",
      text: "Legacy Ltd stands as a paragon of innovation, utilizing a diverse array of data analytics tools to dissect the fabric of their market. Witness here the tools that beget business intelligence:",
    },
    {
      type: "list",
      items: [
        "Advanced Predictive Analytics: Enabling the forecasting of market trends, and consumer behavior.",
        "Customer Data Platforms (CDP): Aggregating and organizing customer data across multiple touchpoints.",
        "Artificial Intelligence (AI): Empowering decision-making with algorithms of inconceivable sophistication.",
      ],
    },
    {
      type: "paragraph",
      text: "Each tool serves as a cog in the vast machinery of Legacy Ltd's analytical prowess. Their analysts, like modern-day oracles, interpret the tapestry of data to unveil patterns unseen to the unaided eye.",
    },
    {
      type: "image-gallery",
      images: [
        "/images/data-driven-blog/image-1.jpg",
        "/images/data-driven-blog/image-2.jpg",
        "/images/data-driven-blog/image-3.jpg",
        "/images/data-driven-blog/image-4.jpg",
      ],
    },
    {
      type: "subtitle",
      text: "Deciphering the Consumer Enigma",
    },
    {
      type: "paragraph",
      text: "Fathom the complexity of human desire; it is as capricious as the wind, as intricate as a spider's web. Yet, in this maelstrom of unpredictability, Legacy Ltd has found structure and predictability. By collecting extensive consumer data, the company discerns patterns in the cacophony of the marketplace:",
    },
    {
      type: "list",
      items: [
        "Purchase Behavior reveals the arcana of consumer needs and the rhythm of repeat business.",
        "Engagement Metrics illuminate the efficacy of marketing campaigns.",
        "Sentiment Analysis gauges the emotional pulse of the consumer populace.",
      ],
    },
    {
      type: "paragraph",
      text: "These insights are the crucible in which strategic decisions are born, allowing Legacy Ltd to not just react to customer trends, but to preempt them.",
    },
    {
      type: "subtitle",
      text: "Operational Optimization: The Forge of Efficiency",
    },
    {
      type: "paragraph",
      text: "Picture the complexity of a corporate ecosystem. There is a dance, a delicate ballet, where every motion, every step influences the next. Legacy Ltd harnesses data to choreograph this performance, employing:",
    },
    {
      type: "list",
      items: [
        "Predictive Maintenance to preclude machine downtime.",
        "Supply Chain Analytics to fortify the sinews of distribution.",
        "Real-Time Data Monitoring to maintain the ceaseless flow of commerce.",
      ],
    },
    {
      type: "paragraph",
      text: "In this grand orchestration, data conducts the symphony of business operations, ensuring that every note resonates with precision and purpose.",
    },
  ],
};

export const BlogDummyData = [
  dataDrivernGrowthBlog,
  BlogData,
  BlogData,
  BlogData,
  BlogData,
  BlogData,
];
