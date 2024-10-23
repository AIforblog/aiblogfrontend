import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "../share-modal";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  initialShares: number;
  postTitle: string;
  postUrl: string;
  onShare?: () => void;
  className?: string;
}

export const ShareButton = ({
  initialShares,
  postTitle,
  postUrl,
  onShare,
  className,
}: ShareButtonProps) => {
  const [shares, setShares] = useState(initialShares);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleShare = () => {
    setShares((prev) => prev + 1);
    setIsModalOpen(true);
    onShare?.();

    setTimeout(() => setIsShared(false), 300);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "bg-transparent outline-none border-none",
          "transition-all duration-300",
          isShared && "text-green-500",
          className
        )}
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2" />
        {shares}
      </Button>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postTitle={postTitle}
        postUrl={postUrl}
      />
    </>
  );
};
