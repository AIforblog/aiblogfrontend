import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authConfig, setSecureCookie } from "@/config/auth.config";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { id_token, isNewLogin } = await request.json();

    if (!id_token) {
      return NextResponse.json(
        { success: false, error: "No id_token provided" },
        { status: 400 }
      );
    }

    console.log("Received id_token:", !!id_token);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API_URL is not configured");
    }

    const response = await axios.post(`${API_URL}auth/google`, {
      id_token,
      isNewLogin,
    });

    // Extract data from the nested response structure
    const {
      data: {
        data: { user, accessToken, refreshToken },
      },
    } = response;

    const cookieStore = cookies();
    setSecureCookie(cookieStore, authConfig.accessTokenKey, accessToken);
    setSecureCookie(cookieStore, authConfig.refreshTokenKey, refreshToken);
    setSecureCookie(cookieStore, authConfig.userDataKey, JSON.stringify(user));

    if (!user || !accessToken || !refreshToken) {
      console.error("Invalid response data:", response.data);
      return NextResponse.json(
        { success: false, error: "Invalid response from auth server" },
        { status: 500 }
      );
    }

    // Create the response
    const nextResponse = NextResponse.json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });

    // Set cookies in the response
    nextResponse.cookies.set(authConfig.accessTokenKey, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    nextResponse.cookies.set(authConfig.refreshTokenKey, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    nextResponse.cookies.set(authConfig.userDataKey, JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return nextResponse;
  } catch (error) {
    console.error("Authentication error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        response: error.response?.data,
        status: error.response?.status,
      });

      return NextResponse.json(
        {
          success: false,
          error: error.response?.data?.message || error.message,
          details: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
