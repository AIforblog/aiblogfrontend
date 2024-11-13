// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         try {
//           const response = await axios.post(`${API_BASE_URL}auth/google`, {
//             token: account.id_token,
//           });

//           if (response.data.user) {
//             user.id = response.data.user.id;
//             user.accessToken = response.data.access_token;
//             user.refreshToken = response.data.refresh_token;
//             return true;
//           }
//         } catch (error) {
//           console.error("Error during Google sign in:", error);
//           return false;
//         }
//       }
//       return false;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.accessToken = token.accessToken as string;
//       session.user.refreshToken = token.refreshToken as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// };

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
