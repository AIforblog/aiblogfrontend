"use server";
import axios from "axios";
import type {
  SignUpParams,
  SignUpResponse,
  SignInParams,
  SignInResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  UpdatePasswordParams,
  UpdatePasswordResponse,
  GoogleSignInResponse,
} from "../types/auth";
import { cookies } from "next/headers";
import {
  authConfig,
  setSecureCookie,
  deleteSecureCookie,
} from "@/config/auth.config";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signupAuth = async (
  params: SignUpParams,
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, params);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.message || "An error occurred during signup",
        status_code: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};

export const signInAuth = async (
  params: SignInParams,
): Promise<SignInResponse> => {
  const payload = {
    email: params.email,
    password: params.password,
  };
  try {
    const response = await axios.post(`${API_URL}auth/login`, payload);
    const { data } = response;

    if (data.statusCode === 200 && data.data) {
      const { accessToken, refreshToken, user } = data.data;

      const cookieStore = cookies();
      setSecureCookie(cookieStore, authConfig.accessTokenKey, accessToken);
      setSecureCookie(cookieStore, authConfig.refreshTokenKey, refreshToken);
      setSecureCookie(
        cookieStore,
        authConfig.userDataKey,
        JSON.stringify(user),
      );

      // Return the full response data
      return {
        data: {
          user,
          accessToken,
          refreshToken,
        },
        status_code: response.status,
        message: "Login successful",
      };
    }
    throw new Error(data.message || "Unexpected response structure");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
      console.error("Axios error message:", error.message);
      console.error("Axios error config:", error.config);
      return {
        error:
          error.response?.data?.message || "An error occurred during sign in",
        status_code: error.response?.status || 500,
      };
    }
    console.error("Unexpected sign in error:", error);
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};  

export const signOutAuth = async (): Promise<{
  status_code: number;
  message?: string;
  error?: string;
}> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(authConfig.accessTokenKey);

    if (!accessToken) {
      return {
        status_code: 401,
        error: "No access token found",
      };
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 200) {
      // Clear all cookies
      deleteSecureCookie(cookieStore, authConfig.accessTokenKey);
      deleteSecureCookie(cookieStore, authConfig.refreshTokenKey);
      deleteSecureCookie(cookieStore, authConfig.userDataKey);

      return {
        status_code: response.status,
        // message: "Logout successful",
      };
    } else {
      return {
        status_code: response.status,
        error: response.data.message || "Unexpected response structure",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
      console.error("Axios error message:", error.message);
      console.error("Axios error config:", error.config);
      return {
        status_code: error.response?.status || 500,
        error:
          error.response?.data?.message || "An error occurred during sign out",
      };
    }
    console.error("Unexpected sign out error:", error);
    return {
      status_code: 500,
      error: "An unexpected error occurred",
    };
  }
};

export const logOutAuth = async (): Promise<{
  status_code: number;
  message?: string;
  error?: string;
}> => {
  try {
    const cookieStore = cookies();

    // Clear all cookies
    deleteSecureCookie(cookieStore, authConfig.accessTokenKey);
    deleteSecureCookie(cookieStore, authConfig.refreshTokenKey);
    deleteSecureCookie(cookieStore, authConfig.userDataKey);

    return {
      status_code: 200,
      message: "Logout successful",
    };
  } catch (error) {
    console.error("Unexpected sign out error:", error);
    return {
      status_code: 500,
      error: "An unexpected error occurred",
    };
  }
};

export const validateOtp = async (email: string, otp: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}auth/otp/validate`, {
      email,
      otp,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "OTP validated successfully",
      };
    }
    return {
      success: false,
      message: response.data.message || "OTP validation failed",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to validate OTP",
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const requestNewOtp = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}auth/otp/sent`, {
      email,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "New OTP has been sent to your email",
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to send new OTP",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to request new OTP",
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const refreshToken = async () => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${API_URL}auth/refresh-token`, {
      refresh_token: refreshToken.value,
    });

    const { access_token, refresh_token } = response.data;
    setSecureCookie(cookieStore, authConfig.accessTokenKey, access_token);
    setSecureCookie(cookieStore, authConfig.refreshTokenKey, refresh_token);
    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    const cookieStore = cookies();
    deleteSecureCookie(cookieStore, authConfig.accessTokenKey);
    deleteSecureCookie(cookieStore, authConfig.refreshTokenKey);
    deleteSecureCookie(cookieStore, authConfig.userDataKey);
    redirect("/auth/sign-in");
  }
};

export const initiateGoogleSignIn = async (): Promise<GoogleSignInResponse> => {
  console.log("Initiating Google Sign In");

  try {
    const authUrl = `${API_URL}auth/google`;

    if (!API_URL) {
      throw new Error("API URL is not configured");
    }

    console.log("Generated auth URL:", authUrl);

    return {
      authUrl,
      error: null,
    };
  } catch (error) {
    console.error("Failed to initiate Google sign in:", error);
    return {
      authUrl: null,
      error: "Failed to initiate Google sign in",
    };
  }
};

export const handleGoogleCallback = async (code: string) => {
  try {
    const response = await axios.get(`${API_URL}auth/google/callback`, {
      params: { code },
      withCredentials: true,
    });

    const { user, accessToken, refreshToken } = response.data;

    if (!user || !accessToken || !refreshToken) {
      throw new Error("Invalid response from Google authentication");
    }

    // Set cookies similar to normal sign-in
    const cookieStore = cookies();
    cookieStore.set(authConfig.accessTokenKey, accessToken, {
      ...authConfig.COOKIE_OPTIONS,
    });
    cookieStore.set(authConfig.refreshTokenKey, refreshToken, {
      ...authConfig.COOKIE_OPTIONS,
    });
    cookieStore.set(authConfig.userDataKey, JSON.stringify(user), {
      ...authConfig.COOKIE_OPTIONS,
    });

    return {
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error in Google callback:", error);
    return {
      success: false,
      data: null,
      error: "Failed to complete Google authentication",
    };
  }
};

export const forgotPasswordAuth = async (
  params: ForgotPasswordParams,
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(`${API_URL}auth/password/forgot`, params);
    return {
      message: response.data.message,
      status_code: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.message ||
          "An error occurred while processing your request",
        status_code: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};

export const updatePasswordAuth = async (
  params: UpdatePasswordParams,
): Promise<UpdatePasswordResponse> => {
  try {
    const response = await axios.post(`${API_URL}auth/password/reset`, params);
    return {
      message: response.data.message,
      status_code: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.message ||
          "An error occurred while processing your request",
        status_code: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};

export const logout = async () => {
  const cookieStore = cookies();

  // Securely delete all auth cookies
  deleteSecureCookie(cookieStore, authConfig.accessTokenKey);
  deleteSecureCookie(cookieStore, authConfig.refreshTokenKey);
  deleteSecureCookie(cookieStore, authConfig.userDataKey);

  redirect("/auth/sign-in");
};
