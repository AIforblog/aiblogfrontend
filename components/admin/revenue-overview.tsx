"use client";

import { Card } from "@/components/ui/card";
import { RevenueChart } from "./ui/chart";

export const RevenueOverview = () => {
  const data = [
    { name: "Subscription Fees", value: 40000, color: "#FFB800" },
    { name: "Ad Revenue Categories", value: 20000, color: "#00C853" },
    { name: "Task Fees", value: 10000, color: "#FF4444" },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Revenue overview</h2>
        <span className="text-sm text-gray-500">October</span>
      </div>
      <RevenueChart data={data} />
    </Card>
  );
};
