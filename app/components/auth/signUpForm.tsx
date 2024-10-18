"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/index";
import Image from "next/image";
import { Mail, CircleUserRound, Eye, EyeOff } from "lucide-react";
import Google from "../../../public/assets/icons/iconGoogle.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupAuth, handleGoogleSignIn } from "@/actions/userAuth";
import { SignUpParams } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: SignUpParams) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await signupAuth(data);
      if (response.error) {
        setError(response.error);
        toast({
          title: "Sign up failed",
          description: response?.error || "An unknown error occurred",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
      } else {
        toast({
          title: "Sign up successful",
          description: "Registration successful",
          className:
            "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
        });
        // Handle successful signup
        sessionStorage.setItem("userEmail", data.email);
        // if (response.status_code === 200 || response.status_code === 201) {
        //   const otpResponse = await sendOtp(data.email);

        //   // If OTP sending fails, log the error but don't affect the signup process
        //   if (otpResponse.error) {
        //     console.error("Failed to send OTP:", otpResponse.error);
        //   }
        // }
        router.push("/auth/otp-verification");
        return {
          data: response.data,
          status_code: response.status_code,
        };
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await handleGoogleSignIn();
      if (result.authUrl) {
        window.location.href = result.authUrl;
      } else {
        setError("Failed to initiate Google sign-in");
      }
    } catch (error) {
      console.error("Error initiating Google sign in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  const handleFacebookSubmit = () => {
    // Handle form submission
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-sm text-gray-500 mb-2">START FOR FREE</h2>
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <div className="flex mb4">
          <div className="w-12 h-12 bg-transparent border border-yellow-400 rounded-l-lg flex items-center justify-center">
            <Image src={Google} alt="Google Icon" width={24} height={24} />
          </div>

          <button
            className="w-full bg-yellow-400 text-black py-3 rounded-r-lg mb-4 flex items-center justify-center"
            onClick={handleGoogleAuth}
          >
            Sign up with Google
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <Link
            href="/"
            onClick={handleFacebookSubmit}
            className="mx-4 text-sm text-[#171717]"
          >
            Or sign up with facebook
          </Link>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <input
                {...register("username")}
                type="text"
                id="username"
                placeholder="Create username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <CircleUserRound
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Mail
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
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
                placeholder="Create password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
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
              "Create Account"
            )}
          </button>
        </form>

        <p className=" text-sm">
          Already have an account?{" "}
          <a href="/auth/sign-in" className="text-yellow-500 hover:underline">
            Sign in
          </a>
        </p>
        <div className="flex-grow mt-5 h-px bg-gray-200"></div>
        <p className="text-center text-xs mt-6 text-gray-500">
          By clicking Signup, you agree to our{" "}
          <a href="#" className="text-black hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpForm;
