import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommentButtonProps {
  commentsCount: number;
  onClick: () => void;
  className?: string;
}

export const CommentButton = ({
  commentsCount,
  onClick,
  className,
}: CommentButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "bg-transparent outline-none border-none",
        "transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {commentsCount}
    </Button>
  );
};
