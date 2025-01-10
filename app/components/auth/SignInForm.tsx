"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../../schemas/index";
import Image from "next/image";
import { Mail, Eye, EyeOff } from "lucide-react";
import Google from "../../../public/assets/icons/iconGoogle.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInAuth, initiateGoogleSignIn } from "@/actions/userAuth";
import { SignInParams } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type FormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: SignInParams) => {
    console.log("FUnction called");
    setIsLoading(true);
    try {
      const response = await signInAuth(data);
      console.log("Full response:", response);
      if (response.error) {
        console.log("Error details:", response.error);
        setError(
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error),
        );
        console.log("Error state");
        toast({
          title: "Sign in failed",
          description: response?.error || "An unknown error occurred",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
      } else {
        if (response.data?.user) {
          try {
            // Save all user data, access token, and refresh token to sessionStorage
            sessionStorage.setItem(
              "userData",
              JSON.stringify(response.data.user),
            );
            if (response.data.accessToken) {
              sessionStorage.setItem("accessToken", response.data.accessToken);
            }
            if (response.data.refreshToken) {
              sessionStorage.setItem(
                "refreshToken",
                response.data.refreshToken,
              );
            }
            console.log("Full response:", response.data);
            toast({
              title: "Sign in successful",
              description: "Welcome back!",
              className:
                "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
            });
            router.push("/");
          } catch (storageError) {
            console.error(
              "Failed to save data to sessionStorage:",
              storageError,
            );
            toast({
              title: "Sign in partially successful",
              description:
                "You're signed in, but we couldn't save your session. You may need to sign in again later.",
              className:
                "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 shadow-md",
            });
            router.push("/");
          }
        } else {
          setError("User data is missing from the response");
          toast({
            title: "Sign in incomplete",
            description:
              "Your sign in was successful, but we couldn't retrieve your user data. Please try again.",
            className:
              "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 shadow-md",
          });
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleAuth = async () => {
  //   setIsGoogleLoading(true);
  //   try {
  //     const { authUrl, error } = await initiateGoogleSignIn();

  //     if (error) {
  //       setError(error);
  //       toast({
  //         title: "Google Sign In Failed",
  //         description: error,
  //         variant: "destructive",
  //         className:
  //           "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //       });
  //       return;
  //     }

  //     if (authUrl) {
  //       // Redirect to Google auth URL
  //       window.location.href = authUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error initiating Google sign in:", error);
  //     setError("Failed to initiate Google sign in. Please try again.");
  //     toast({
  //       title: "Google Sign In Failed",
  //       description: "An unexpected error occurred. Please try again.",
  //       variant: "destructive",
  //       className:
  //         "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //     });
  //   } finally {
  //     setIsGoogleLoading(false);
  //   }
  // };

  const handleGoogleAuth = async () => {
    console.log("handleGoogleAuth started");
    setIsGoogleLoading(true);

    try {
      const { authUrl, error } = await initiateGoogleSignIn();
      console.log("initiateGoogleSignIn response:", { authUrl, error });

      if (error) {
        console.error("Error returned from initiateGoogleSignIn:", error);
        setError(error);
        toast({
          title: "Google Sign In Failed",
          description: error,
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
        return;
      }

      if (authUrl) {
        console.log("Redirecting to Google auth URL:", authUrl);
        // Store the current URL as the return URL
        sessionStorage.setItem("returnUrl", window.location.href);
        // Redirect to the Google auth URL
        window.location.href = authUrl;
      } else {
        throw new Error("No authentication URL received");
      }
    } catch (error) {
      console.error("Error in handleGoogleAuth:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setError("Failed to initiate Google sign in. Please try again.");
      toast({
        title: "Google Sign In Failed",
        description: errorMessage,
        variant: "destructive",
        className:
          "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="dark:bg-secondary bg-white shadow-lg text-black dark:text-white p-8 max-md:px-4 rounded-3xl w-full max-w-md mx-4">
        <h2 className="text-sm text-gray-500 mb-2">WELCOME BACK</h2>
        <h1 className="text-2xl font-bold mb-6">Sign In to Your Account</h1>

        <div className="flex mb-4">
          <div className="w-12 h-12 bg-transparent border border-yellow-400 rounded-l-lg flex items-center justify-center">
            <Image src={Google} alt="Google Icon" width={24} height={24} />
          </div>

          <button
            className="w-full bg-yellow-400 text-black py-3 rounded-r-lg flex items-center justify-center"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div className="flex items-center">
                <div role="status" className="mr-2">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
                Connecting...
              </div>
            ) : (
              "Sign in with Google"
            )}
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-[#171717] text-white/90">
            Or sign in with Facebook
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email_or_username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                id="email_or_username"
                placeholder="Enter your email or username"
                className="w-full px-3 py-2 h-12 placeholder:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Mail
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 h-12 placeholder:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg mb-4 flex items-center justify-center"
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex justify-between items-center">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-yellow-500 hover:underline"
          >
            Forgot Password?
          </Link>
          <p className="text-xs">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-yellow-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex-grow mt-5 h-px bg-gray-200"></div>
        <p className="text-center text-xs mt-6 text-gray-500">
          By clicking Sign In, you agree to our{" "}
          <a href="#" className="text-black dark:text-white/60 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black dark:text-white/60 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default SignInForm;
