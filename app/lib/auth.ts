import { refreshToken } from "../../actions/userAuth";

export const handleTokenRefresh = async () => {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) {
      throw new Error("No refresh token available");
    }

    const response = await refreshToken();
    if (response.error) {
      throw new Error(response.error);
    }

    localStorage.setItem("accessToken", response.data.access_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Clear auth data and redirect to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/sign-in";
    throw error;
  }
};
