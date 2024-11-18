import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const UnauthenticatedBanner: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 px-7 z-50 flex items-center justify-between">
      <div className="flex-grow mr-4">
        <p className="text-sm">
          Join our community to unlock full features and connect with others!
        </p>
      </div>
      <div className="flex space-x-3">
        <Button asChild variant="outline" className="text-black" size="sm">
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
        <Button
          asChild
          variant="default"
          className="bg-[#fdc316] text-black hover:text-white"
          size="sm"
        >
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export const AuthRequiredModal: React.FC<{
  action?: string;
  onClose?: () => void;
}> = ({ action = "perform this action", onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-4">
          You need to be signed in to {action}. Join our community to unlock
          full features!
        </p>
        <div className="flex space-x-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="default" className="w-full">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
