"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatCard from "./ui/statCard";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";

const stats = [
  {
    icon: <Eye />,
    value: "4,000",
    percentageChange: "+10% from last month",
    label: "Total Views",
    changeColor: "text-green-500",
  },
  {
    icon: <ThumbsUp />,
    value: "1,500",
    percentageChange: "+20% from last month",
    label: "Total Likes",
    changeColor: "text-green-500",
  },
  {
    icon: <MessageCircle />,
    value: "2,500",
    percentageChange: "-50% from last month",
    label: "Total Comments",
    changeColor: "text-red-500",
  },
  {
    icon: <Share2 />,
    value: "2,500",
    percentageChange: "+5% from last month",
    label: "Total Shares",
    changeColor: "text-green-500",
  },
  {
    icon: <Flag />,
    value: "2,500",
    percentageChange: "-30% from last month",
    label: "Flagged Users",
    changeColor: "text-red-500",
  },
];

export function JobDetails() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Details</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                percentageChange={stat.percentageChange}
                label={stat.label}
                changeColor={stat.changeColor}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  Data-Driven Growth: How Legacy Ltd Harnesses Insights for
                  Business Success
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Igho Faith Auguston</span>
                  <span>•</span>
                  <span>4 mins read</span>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  In the ever-evolving business landscape, where volatile
                  markets and burgeoning technologies perpetually redefine the
                  game, one steadfast titan has consistently outstripped the
                  competition...
                </p>
                <h4 className="text-lg font-semibold text-foreground">
                  The Forefront of Analytical Excellence
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span>
                      Advanced Predictive Analytics: Enabling the forecasting of
                      market trends, and consumer behavior.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span>
                      Customer Data Platforms (CDP): Aggregating and organizing
                      customer data across multiple touchpoints.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span>
                      Artificial Intelligence (AI): Empowering decision-making
                      with algorithms of inconceivable sophistication
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Accepted by</CardTitle>
              <Badge variant="outline">12/25</Badge>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>

                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[
                { status: "approved" },
                { status: "approved" },
                { status: "pending" },
                { status: "declined" },
                { status: "approved" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>OD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Olamide</div>
                      <div className="text-sm text-muted-foreground">
                        @olamide • 3hrs ago
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      item.status === "approved"
                        ? "text-green-500"
                        : item.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
