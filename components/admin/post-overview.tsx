"use client";

import { Card } from "@/components/ui/card";
import { PostChart } from "./ui/chart";

export const PostOverview = () => {
  const data = [
    { name: "Text", value: 37.5, color: "#8B5CF6" },
    { name: "Image", value: 28.1, color: "#EF4444" },
    { name: "Tasks", value: 18.8, color: "#60A5FA" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Post Overview</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-semibold">120</div>
          <div className="text-sm text-gray-500">Today</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">850</div>
          <div className="text-sm text-gray-500">This week</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">3,200</div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
      </div>
      <PostChart data={data} />
      <div className="text-sm text-green-500 mt-4">+12% from last month</div>
    </Card>
  );
};
