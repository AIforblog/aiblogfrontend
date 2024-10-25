import { cn } from "@/lib/utils";
import Image from "next/image";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CoverImage({ src, alt, className}: CoverImageProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden rounded-2xl",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        priority
        className="object-cover"
      />
    </div>
  );
}