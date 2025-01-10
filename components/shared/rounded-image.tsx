import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}
interface DefaultImageProps extends Pick<ImageProps, "size" | "className"> {
  letter: string;
}
export function RoundedImage({ src, alt, size = 115, className }: ImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
}

export function DefaultImage({
  size = 40,
  className,
  letter,
}: DefaultImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-neutral-200 text-white items-center justify-center flex",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
}
