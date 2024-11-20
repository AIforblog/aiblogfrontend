/* eslint-disable react/display-name */
import { memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface TopicProps {
  topic: string;
  slug: string;
}

const TopicCTA = memo<TopicProps>(({ topic, slug }) => {
  return (
    <Button
      asChild
      className="rounded-full text-[#171717] font-normal capitalize border border-[#E5E5E5] dark:border-neutral-800 bg-[#E8E8E8] hover:bg-[#E8E8E840] text-xs transition duration-300 ease-in-out"
    >
      <Link href={`/${slug}`}>{topic}</Link>
    </Button>
  );
});

export default TopicCTA;
