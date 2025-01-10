import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialLikes: number;
  onLike?: () => void;
  className?: string;
}

export const LikeButton = ({
  initialLikes,
  onLike,
  className,
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    onLike?.();

    setTimeout(() => setIsLiked(false), 300);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "bg-transparent outline-none border-none",
        "transition-all duration-300",
        isLiked && "text-red-500",
        className,
      )}
      onClick={handleLike}
    >
      <ThumbsUp className="w-4 h-4 mr-2" />
      {likes}
    </Button>
  );
};
