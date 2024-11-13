"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import navImg from "../../public/assets/nav-profile.png";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const  pathname = usePathname().split("/")[2];
  console.log(pathname,"pathname")
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className={styles.logoText}>drello</span>
            </Link>

            {/* Navigation Links */}
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="overview"
                className={cn(
                  "text-gray-500 hover:text-gray-900",
                  pathname === "overview" && "text-yellow-500 border-b-2 border-yellow-400 pb-4"
                )}
              >
                Overview
              </Link>
              <Link
                href="user"
                className={cn(
                  "text-gray-500 hover:text-gray-900",
                  pathname === "user" && "text-yellow-500 border-b-2 border-yellow-400 pb-4"
                )}
              >
                User
              </Link>
              <Link
                href="content"
                className={cn(
                  "text-gray-500 hover:text-gray-900",
                  pathname === "content" && "text-yellow-500 border-b-2 border-yellow-400 pb-4"
                )}
              >
                Content
              </Link>
              <Link
                href="dashboard"
                className={cn(
                  "text-gray-500 hover:text-gray-900",
                  pathname === "dashboard" && "text-yellow-500 border-b-2 border-yellow-400 pb-4"
                )}
              >
                Jobs/Post
              </Link>
              <Link
                href="transactions"
                className={cn(
                  "text-gray-500 hover:text-gray-900",
                  pathname === "transactions" && "text-yellow-500 border-b-2 border-yellow-400 pb-4"
                )}
              >
                Transactions
              </Link>
            </div>
          </div>

          {/* Right section - Search, Notifications, and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Find..."
                className="pl-10 w-[240px] bg-gray-50 border-gray-200"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 relative">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>

            {/* Profile Picture */}
            <Image
              src={navImg}
              alt="Profile"
              width={8}
              height={8}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
