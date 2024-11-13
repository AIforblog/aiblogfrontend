"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GoogleCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const authenticateGoogle = async () => {
      console.log("Starting Google authentication process");
      const code = searchParams.get("code");
      console.log("Code from URL:", code);

      const allParams = Object.fromEntries(searchParams.entries());
      console.log("All URL parameters:", allParams);
      console.log(
        "All search params:",
        Object.fromEntries(searchParams.entries())
      );
      console.log("Authorization code:", code);
      console.log("API URL being used:", API_URL);

      if (!code) {
        const error = searchParams.get("error");
        console.error("Google auth error:", error);
        console.error("Error reason:", searchParams.get("error_reason"));
        console.error(
          "Error description:",
          searchParams.get("error_description")
        );
        toast({
          title: "Authentication Failed",
          description: "No authentication code received. Please try again.",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
        router.push("/auth/sign-in");
        return;
      }

      try {
        console.log(
          "Making request to callback endpoint:",
          `${API_URL}auth/google/callback`
        );
        console.log("Request params:", { code, withCredentials: true });
        const response = await axios.get(`${API_URL}auth/google/callback`, {
          params: { code },
          withCredentials: true,
        });

        console.log("Raw response from server:", response);
        const { data } = response;
        console.log("Parsed response data:", data);

        if (data.statusCode === 200 && data.data) {
          console.log("Authentication successful, user data:", data.data.user);
          const { user, accessToken, refreshToken } = data.data;

          // Log token information (but not the full tokens for security)
          console.log("Access token received:", accessToken ? "Yes" : "No");
          console.log("Refresh token received:", refreshToken ? "Yes" : "No");
          console.log("User email from response:", user.email);

          toast({
            title: "Sign in successful",
            description: "Welcome back!",
            className:
              "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
          });
          console.log("Redirecting to home page");
          router.push("/");
        } else {
          console.error("Authentication response invalid:", data);
          throw new Error(data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Failed to authenticate:", error);
        toast({
          title: "Authentication Error",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred. Please try again.",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
        router.push("/auth/sign-in");
      }
    };

    authenticateGoogle();
  }, [router, searchParams, toast]);

  useEffect(() => {
    console.log("GoogleCallbackContent mounted");
    return () => console.log("GoogleCallbackContent unmounted");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">
          Completing Sign In
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we authenticate your Google account...
        </p>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

const GoogleCallbackPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleCallbackContent />
    </Suspense>
  );
};

export default GoogleCallbackPage;
