import AuthTopicCard from "./auth-topic-card";

// For the layout, to check if the user is
// authenticated and change the layout accordingly
type TrendingTopicCardProps = {
  trendingTopics: {
    topic: string;
    num_posts: number;
    related_topics: {
      topic: string;
      num_posts: number;
    }[];
  }[];
};

const TrendingTopicCard = ({ trendingTopics }: TrendingTopicCardProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-6 pb-12">
        {trendingTopics.map((topics, index) => (
          <AuthTopicCard key={index} item={topics} />
        ))}
      </div>
    </div>
  );
};
export default TrendingTopicCard;
