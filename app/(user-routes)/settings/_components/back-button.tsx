"use client";

import Button from "@/components/shared/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="text-black bg-[#F9F7B9] hover:bg-[#f7e867] font-normal"
      icon={ArrowLeft}
    >
      Back
    </Button>
  );
};
