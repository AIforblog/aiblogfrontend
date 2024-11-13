"use server";

import { User } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshToken } from "../actions/userAuth";
import { authConfig, deleteSecureCookie } from "@/config/auth.config";

export const assertUserAuthenticated = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const userDataCookie = cookieStore.get("userData");

  if (!accessToken || !userDataCookie) {
    throw new Error("User not authenticated");
  }

  try {
    const user = JSON.parse(userDataCookie.value) as User;

    // Set a refresh timer for token renewal every hour if it doesn't exist
    if (typeof window !== "undefined") {
      setTokenRefreshTimer();
    }

    return {
      accessToken,
      userId: user.id,
      user,
    };
  } catch (error) {
    console.error("Error parsing user data:", error);
    clearAuthCookies();
    throw new Error("Invalid authentication");
  }
};

// Utility function to delete auth-related cookies
const clearAuthCookies = () => {
  const cookieStore = cookies();
  deleteSecureCookie(cookieStore, authConfig.accessTokenKey);
  deleteSecureCookie(cookieStore, authConfig.refreshTokenKey);
  deleteSecureCookie(cookieStore, authConfig.userDataKey);
};

export const getAuthHeaders = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return {
    Authorization: `Bearer ${accessToken?.value || ""}`,
  };
};

export const isAuthenticated = async () => {
  const cookieStore = cookies();
  return !!cookieStore.get("accessToken");
};

export const logout = async () => {
  clearAuthCookies();
  redirect("/auth/sign-in");
};

// Function to handle token refresh every hour
let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;
const setTokenRefreshTimer = () => {
  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
  }
  refreshTokenTimeout = setTimeout(async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      } else {
        redirect("/auth/sign-in");
      }
    }
  }, 3600000); // 1 hour
};
