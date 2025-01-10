"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import StatCard from "./ui/statCard";

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

export function PostDetails() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between ml-8">
        <h3 className="text-[20px] font-bold">Post Details</h3>
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
      </div>
      <Card>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 p-4">
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
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              Data-Driven Growth: How Legacy Ltd Harnesses Insights for Business
              Success
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                In the ever-evolving business landscape, where volatile markets
                and burgeoning technologies perpetually redefine the game, one
                steadfast titan has consistently outstripped the competition.
                Legacy Ltd, a bastion of industry whose name has become
                synonymous with sustainable success, has mastered the art of
                leveraging data-driven strategies to fuel its growth.
              </p>
              <h4 className="text-lg font-semibold text-foreground">
                The Forefront of Analytical Excellence
              </h4>
              <p>
                Legacy Ltd stands as a paragon of innovation, utilizing a
                diverse array of data analytics tools to dissect the fabric of
                their market. Witness here the tools that beget business
                intelligence:
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  <strong>Advanced Predictive Analytics:</strong> Enabling the
                  forecasting of market trends, and consumer behavior.
                </li>
                <li>
                  <strong>Customer Data Platforms (CDP):</strong> Aggregating
                  and organizing customer data across multiple touchpoints.
                </li>
                <li>
                  <strong>Artificial Intelligence (AI):</strong> Empowering
                  decision-making with algorithms of inconceivable
                  sophistication.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Replies</CardTitle>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>OD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Olamide</span>
                        <span className="text-sm text-muted-foreground">
                          @olamide
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        3hrs ago
                      </span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Once upon a time in a bustling city, there lived a talented
                    musician named Emily. With her enchanting voice and soulful
                    melodies, she captivated audiences wherever she performed.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      1.5K
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      3.5K
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-3 w-3 mr-1" />
                      5K
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Textarea className="mt-6" placeholder="Write a reply..." />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
