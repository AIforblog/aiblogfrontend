import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TagsSectionProps {
  tags: string[];
  className?: string;
  icon?: ReactNode;
}

const BlogTags: React.FC<TagsSectionProps> = ({ tags, className, icon }) => {
  return (
    <div className={cn("hidden md:block")}>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-[25px] flex items-center justify-center gap-2 border-none outline-none",
              className,
            )}
          >
            {icon && icon} {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
