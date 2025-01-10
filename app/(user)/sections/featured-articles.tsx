"use client";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/article";
import type { ArticleProps } from "@/types/article";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://gateway.drello.xyz/api/v1/blog?featured=true",
        );
        const data = await response.json();
        console.log(data, "huuhuh");
        const parsedArticles = data.data.results.map(
          (item: any): ArticleProps => ({
            user: {
              username: `@${item.username}`,
              profilePic: item.profilePic || "/profile.png",
              name: `${item.firstName} ${item.lastName}`,
              // timestamp: Date.now() - 1000 * 60 * 5,
              coverPhoto: "/default-cover.jpg",
              verified: true,
              bio: "Default bio text",
              externalLink: "https://example.com",
              createdAt: "Date not available",
              followersCount: 0,
              followingCount: 0,
              id: item.userId,
              userId: "",
            },
            title: item.title,
            image: item.thumbnail || "/blog_image.png",
            description: item.content
              .replace(/<\/?[^>]+(>|$)/g, "")
              .slice(0, 100), // Basic sanitization and truncation
            date: new Date(item.publishedAt).toLocaleDateString(),
          }),
        );
        setArticles(parsedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="">
      <div className="containerHeight overflow-scroll custom-scroll pt-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          articles.map((article, index) => (
            <ArticleCard key={article.user.id || index} article={article} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedArticles;
