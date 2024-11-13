"use client";
import { useState } from "react";

import { JobDetails } from "@/components/admin/jobDetails";
import UserProfile from "@/components/admin/userInformation";
import { PostDetails } from "@/components/admin/PostsDashboard";


export default function JobPostPageComponent() {
  const [activeTab, setActiveTab] = useState<"jobs" | "posts">("jobs");

  return (
    <div className="min-h-screen px-[30px]">
     <div className="flex space-x-1 items-center bg-gray-50 rounded-3xl w-fit bg-white mb-8 mt-2">
  <button
    onClick={() => setActiveTab("jobs")}
    className={`group relative px-4 py-2 rounded-3xl transition-colors duration-200 ${
      activeTab === "jobs" ? "bg-yellow-200" : ""
    }`}
  >
    <span
      className={`${
        activeTab === "jobs"
          ? " font-medium"
          : "text-gray-600 group-hover:text-gray-800"
      }`}
    >
      Jobs
    </span>
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-transform duration-200 ${
        activeTab === "jobs" ? "scale-x-100" : "scale-x-0"
      }`}
    />
  </button>
  <button
    onClick={() => setActiveTab("posts")}
    className={`group relative px-4 py-2 rounded-3xl transition-colors duration-200 ${
      activeTab === "posts" ? "bg-yellow-200" : ""
    }`}
  >
    <span
      className={`${
        activeTab === "posts"
          ? "font-medium"
          : "text-gray-600 group-hover:text-gray-800"
      }`}
    >
      Posts
    </span>
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-transform duration-200 ${
        activeTab === "posts" ? "scale-x-100" : "scale-x-0"
      }`}
    />
  </button>
</div>

      <div className="container p-0">
        <div className="space-y-6"> 
          <UserProfile />
          
          <div
        key={activeTab}
        className="transition-opacity duration-200"
        style={{
          opacity: 1,
          animation: "fadeIn 0.2s ease-in",
        }}
      >
        {activeTab === "jobs" ? <JobDetails /> : <PostDetails />}
      </div>

      {/* Add the animation keyframes using a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
        </div>   
      </div>
    
  );
}
