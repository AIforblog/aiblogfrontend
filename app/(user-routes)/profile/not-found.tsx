"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4"
          initial={{ scale: 0.5, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          404
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Profile Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The profile you&apos;re looking for doesn&apos;t exist.
        </p>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      >
        <svg
          className="w-48 h-48"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="8"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M65 80C65 91.0457 74.1929 100 85 100C95.8071 100 105 91.0457 105 80C105 68.9543 95.8071 60 85 60C74.1929 60 65 68.9543 65 80Z"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          <motion.path
            d="M95 80C95 91.0457 104.193 100 115 100C125.807 100 135 91.0457 135 80C135 68.9543 125.807 60 115 60C104.193 60 95 68.9543 95 80Z"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <motion.path
            d="M70 130C70 130 85 140 100 140C115 140 130 130 130 130"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </motion.div>
    </div>
  );
}
