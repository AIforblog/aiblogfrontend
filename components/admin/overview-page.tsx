import { Eye, ThumbsUp, MessageCircle, Share2, Flag } from "lucide-react"
import { JobReview } from "./job-review"
import { PostOverview } from "./post-overview"
import { RevenueOverview } from "./revenue-overview"
import { TaskMetricsOverview } from "./task-metrics-overview"
import { TotalActiveUsers } from "./total-active-users"
import StatCard from "./ui/statCard"


export default function DashboardPage() {
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
        {
            icon: <Flag />,
            value: "2,500",
            percentageChange: "-30% from last month",
            label: "Flagged Users",
            changeColor: "text-red-500",
          },
      ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-6 gap-4 rounded-xl bg-white p-4 ">
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
      <div className="grid grid-cols-2 gap-4">
        <TotalActiveUsers />
        <RevenueOverview />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
        <JobReview />
        </div>
        <PostOverview />
        <TaskMetricsOverview />
      </div>
    </div>
  )
}