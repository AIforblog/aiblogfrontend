import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Check, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PublishProps {
  onPublish: () => void;
  isPending: boolean;
}

export default function Publish({ onPublish, isPending }: PublishProps) {
  const [open, setOpen] = useState(false);

  const handlePublish = () => {
    onPublish();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="font-medium text-gray bg-cta-primary-normal rounded-full py-6 px-6 border border-transparent"
          type="button"
          disabled={isPending}
        >
          {isPending && <Loader className="animate-spin h-4 w-4 mr-2" />}
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center gap-5">
          <Image
            src={"/CursorClick.png"}
            alt="Cursor Click"
            height={32}
            width={32}
          />
          <div className="text-center">
            <DialogTitle className="text-sm text-neutral-800">
              Get, set, Publish
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-700 mb-2 font-normal">
              Your article is ready to be shared with the world!
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator className="" />
        <DialogFooter className="flex flex-row !justify-between items-start w-full">
          <Button
            className="border-text-color text-neutral-700 font-medium rounded-full"
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-cta-primary-normal flex items-center gap-3 rounded-full text-neutral-800 hover:text-white transition-colors duration-300"
          >
            <Check className="h-4 w-4" />
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
