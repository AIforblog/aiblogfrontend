import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Link2,
  Twitter,
  Facebook,
  Linkedin,
  MessageSquare,
  Send,
  Hash,
  Phone,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postUrl: string;
}

export const ShareModal = ({
  isOpen,
  onClose,
  postTitle,
  postUrl,
}: ShareModalProps) => {
  const { toast } = useToast();
  const [clickedPlatform, setClickedPlatform] = useState<string | null>(null);

  const handlePlatformClick = async (platform: any) => {
    setClickedPlatform(platform.name);
    await platform.action();
    setTimeout(() => setClickedPlatform(null), 1000);
  };

  const socialPlatforms = [
    {
      name: "Copy Link",
      icon: Link2,
      activeIcon: Check,
      action: async () => {
        await navigator.clipboard.writeText(postUrl);
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      message: `📚 Just read this amazing article!\n\n${postTitle}\n\n#MustRead #Sharing`,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `📚 Just read this amazing article!\n\n${postTitle}`,
          )}&url=${encodeURIComponent(postUrl)}`,
          "_blank",
        );
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      message: `📖 Found this interesting read: ${postTitle}`,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl,
          )}&quote=${encodeURIComponent(
            `📖 Found this interesting read: ${postTitle}`,
          )}`,
          "_blank",
        );
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      message: `I found this insightful article that I'd like to share with my network.\n\n${postTitle}`,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            postUrl,
          )}`,
          "_blank",
        );
      },
    },
    {
      name: "Reddit",
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      message: `🤔 Thought-provoking article: ${postTitle}. What do you think?`,
      action: () => {
        window.open(
          `https://www.reddit.com/submit?title=${encodeURIComponent(
            postTitle,
          )}&url=${encodeURIComponent(postUrl)}`,
          "_blank",
        );
      },
    },
    {
      name: "Telegram",
      icon: Send,
      message: `📎 Interesting read:\n\n${postTitle}`,
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            postUrl,
          )}&text=${encodeURIComponent(
            `📎 Interesting read:\n\n${postTitle}`,
          )}`,
          "_blank",
        );
      },
    },
    {
      name: "Discord",
      icon: MessageSquare,
      message: `💡 Check out this article I found:\n\n**${postTitle}**\n${postUrl}`,
      action: () => {
        const discordText = `💡 Check out this article I found:\n\n**${postTitle}**\n${postUrl}`;
        navigator.clipboard.writeText(discordText);
        toast({
          title: "Copied for Discord!",
          description:
            "The formatted text has been copied to your clipboard. You can now paste it in Discord.",
        });
      },
    },
    {
      name: "HackerNews",
      icon: Hash,
      message: `Show HN: ${postTitle}`,
      action: () => {
        window.open(
          `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
            postUrl,
          )}&t=${encodeURIComponent(`Show HN: ${postTitle}`)}`,
          "_blank",
        );
      },
    },
    {
      name: "WhatsApp",
      icon: Phone,
      message: `📱 Hey! Found this interesting article:\n\n${postTitle}`,
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `📱 Hey! Found this interesting article:\n\n${postTitle}\n\n${postUrl}`,
          )}`,
          "_blank",
        );
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          {socialPlatforms.map((platform) => {
            const Icon =
              clickedPlatform === platform.name && platform.activeIcon
                ? platform.activeIcon
                : platform.icon;

            return (
              <button
                key={platform.name}
                onClick={() => handlePlatformClick(platform)}
                className={`
                  flex flex-col items-center gap-2 p-2 rounded-lg
                  transition-all duration-200 transform
                  ${
                    clickedPlatform === platform.name
                      ? "bg-green-50 scale-95"
                      : "hover:bg-gray-100 hover:scale-105"
                  }
                `}
              >
                <Icon
                  className={`h-6 w-6 ${
                    clickedPlatform === platform.name ? "text-green-600" : ""
                  }`}
                />
                <span className="text-xs">{platform.name}</span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
