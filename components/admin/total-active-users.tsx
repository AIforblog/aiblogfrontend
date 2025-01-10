"use client";

import { Card } from "@/components/ui/card";
import { ActiveUsersChart } from "./ui/chart";

export const TotalActiveUsers = () => {
  const data = [
    { name: "100", monthly: 8000, daily: 600 },
    { name: "50", monthly: 7500, daily: 550 },
    { name: "1000", monthly: 9000, daily: 650 },
    { name: "50", monthly: 7000, daily: 500 },
    { name: "2000", monthly: 9500, daily: 700 },
    { name: "2000", monthly: 9800, daily: 750 },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Total Active Users</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold">10,000</span>
            <span className="ml-2 text-sm text-green-500">+5.55%</span>
          </div>
          <div className="text-sm text-gray-500">Monthly users</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-xl">1,000</span>
            <span className="ml-2 text-sm text-green-500">+2.05%</span>
          </div>
          <div className="text-sm text-gray-500">Daily users</div>
        </div>
      </div>
      <ActiveUsersChart data={data} />
    </Card>
  );
};
