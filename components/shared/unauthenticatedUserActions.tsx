import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export const AuthRequiredModal = ({
  action = "perform this action",
  onClose,
  onAuthenticated,
  redirectPath,
}: {
  action?: string;
  onClose?: () => void;
  onAuthenticated?: () => void;
  redirectPath?: string;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleAuthAction = async (authPath: string) => {
    setIsProcessing(true);

    // Store the callback in sessionStorage if provided
    if (onAuthenticated) {
      sessionStorage.setItem("authCallback", "true");
    }

    // Store the current path or provided redirect path for post-login redirect
    const returnPath = redirectPath || window.location.pathname;
    sessionStorage.setItem("authReturnPath", returnPath);

    // Store the pending action if provided
    if (action) {
      sessionStorage.setItem("pendingAuthAction", action);
    }

    // Navigate to auth page
    router.push(
      `/auth/${authPath}?returnUrl=${encodeURIComponent(returnPath)}`,
    );
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Call onAuthenticated when authentication is successful
  useEffect(() => {
    const handleAuthSuccess = () => {
      if (onAuthenticated) {
        onAuthenticated();
      }
    };

    window.addEventListener("auth-success", handleAuthSuccess);

    return () => {
      window.removeEventListener("auth-success", handleAuthSuccess);
    };
  }, [onAuthenticated]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Authentication Required</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            You need to be signed in to {action}. Join our community to unlock
            full features!
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
              onClick={() => handleAuthAction("sign-in")}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-primary"
              disabled={isProcessing}
              onClick={() => handleAuthAction("sign-up")}
            >
              Sign Up
            </Button>
          </div>

          {isProcessing && (
            <p className="text-sm text-center text-gray-500">
              Redirecting to authentication...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
