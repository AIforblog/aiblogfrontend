export const authConfig = {
  accessTokenKey: "accessToken",
  refreshTokenKey: "refreshToken",
  userDataKey: "userData",
  tokenType: "Bearer",
  routes: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    home: "/",
    otpVerification: "/auth/otp-verification",
    error: "/auth/error",
  },
  apiEndpoints: {
    login: "auth/login",
    register: "auth/register",
    refreshToken: "auth/refresh-token",
    verifyToken: "auth/verify",
    googleAuth: "auth/google",
    googleCallback: "auth/google/callback",
    forgotPassword: "auth/password/forgot",
    validateOtp: "auth/otp/validate",
    requestOtp: "auth/otp/sent",
  },
  COOKIE_OPTIONS: {
    httpOnly: true,
    path: "/",
    maxAge: 86000, // 24 hours
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  },
};

export const setSecureCookie = (
  cookieStore: any,
  key: string,
  value: string,
  options = {}
) => {
  cookieStore.set(key, value, {
    ...authConfig.COOKIE_OPTIONS,
    ...options,
  });
};

// Function to handle secure cookie deletion
export const deleteSecureCookie = (cookieStore: any, key: string) => {
  cookieStore.delete(key, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
