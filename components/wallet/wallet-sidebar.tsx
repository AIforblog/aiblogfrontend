import React from "react";
import { PenSquare, Briefcase, UserPlus, Trophy, BookOpen } from "lucide-react";

const EarningsSidebar = () => {
  const earningOptions = [
    {
      title: "Create Engaging Content",
      description:
        "Post valuable content that gets liked, shared, and commented on to earn ETH based on engagement.",
      status: "Available",
      icon: PenSquare,
    },
    {
      title: "Complete Jobs for ETH",
      description:
        "Take on tasks and jobs posted by others and complete them to earn rewards in ETH.",
      status: "Available",
      icon: Briefcase,
    },
    {
      title: "Create Jobs and Pay Others",
      description:
        "Create your own jobs and tasks for other users to complete. Pay in ETH for each successful task.",
      status: "Available",
      icon: UserPlus,
    },
    {
      title: "Participate in dRello Challenges",
      description:
        "Join platform-wide challenges and competitions to earn rewards based on your performance.",
      status: "Coming soon",
      icon: Trophy,
    },
    {
      title: "Monetize Your Blogs",
      description:
        "Publish long-form content and monetize it based on views and engagement.",
      status: "Coming soon",
      icon: BookOpen,
    },
  ];

  return (
    <div className="bg-white">
      <div className="bg-yellow-50 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Ways to Earn on dRello
        </h1>
        <p className="text-sm text-gray-600">
          Every description will be saved as drafts for recovery
        </p>
      </div>

      <div className="space-y-4 p-4 maxHeight overflow-scroll custom-scroll bg-white">
        {earningOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  {option.description}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    option.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {option.status}
                </span>
              </div>
              <div>
                <option.icon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsSidebar;
