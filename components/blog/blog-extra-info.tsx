/* eslint-disable react/display-name */

"use client";

import { ArrowUp } from "lucide-react";
import { memo } from "react";

interface ExtraInfoItemProps {
  title: string;
  onClick: () => void;
}

interface InfoProps {
  items?: string[]; // Made optional to handle undefined case
}

const ExtraInfoItem = ({ title, onClick }: ExtraInfoItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center gap-x-1 bg-[#ECEBFF] hover:bg-[#e7e6ff] hover:cursor-pointer p-1.5 rounded-full transition duration-300 ease-in-out"
    >
      <ArrowUp className="w-3 h-3 text-[#574EFA]" />

      <h3 className="text-xs font-medium capitalize text-center text-[#574EFA]">
        {title}
      </h3>
    </div>
  );
};

const BlogExtraInfo = memo<InfoProps>(({ items = [] }) => {
  // Added default empty array
  const handleClick = (item: string) => {
    console.log(item); // Click event for each item
  };

  // If no items, don't render anything
  if (!items?.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      {items.map((item, index) => (
        <ExtraInfoItem
          key={`${item}-${index}`} // Better key composition
          title={item}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
});

// Add display name for debugging purposes
BlogExtraInfo.displayName = "BlogExtraInfo";

export default BlogExtraInfo;
