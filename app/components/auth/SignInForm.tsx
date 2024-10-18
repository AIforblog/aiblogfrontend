// "use client";

// import Image from "next/image";
// import { Button } from "../../../components/ui/button";
// import { EyeIcon, EyeOffIcon, CircleUserRound } from "lucide-react";
// import { Input } from "../../../components/ui/input";
// import { Checkbox } from "../../../components/ui/checkbox";
// import { useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import Link from "next/link";

// const signInFormSchema = z.object({
//   email_or_username: z
//     .union([
//       z.string().email({ message: "Invalid email address" }),
//       z
//         .string()
//         .min(3, { message: "Username must be at least 3 characters long" })
//         .max(30, { message: "Username cannot exceed 30 characters" })
//         .regex(/^[a-zA-Z0-9_]+$/, {
//           message:
//             "Username can only contain letters, numbers, and underscores",
//         }),
//     ])
//     .refine((value) => value.trim() !== "", {
//       message: "Email or username is required",
//     }),
//   password: z
//     .string()
//     .min(4, { message: "Password must be at least 4 characters long" }),
// });

// type FormData = z.infer<typeof signInFormSchema>;

// const SignIn = () => {
//   const [showPassword, setShowPasword] = useState(false);

//   const form = useForm<FormData>({
//     resolver: zodResolver(signInFormSchema),
//     defaultValues: {
//       email_or_username: "",
//       password: "",
//     },
//   });

//   const togglePasswordVisibility = () => {
//     setShowPasword(!showPassword);
//   };

//   const handleFormSubmit = async (data: FormData) => {
//     console.log("Form Data is: ", data);
//   };

//   return (
//     <div className="shadow-[1.5rem] px-16 py-12 rounded-lg w-[30rem] sm:w-[40rem] bg-white dark:bg-[#262626] dark:text-white">
//       <h2 className="font-bold text-2xl mb-6">Sign In</h2>
//       <div className="flex w-full mb-4 flex-col gap-4">
//         <div className="flex rounded-lg ">
//           <div className="bg-white p-3 flex justify-center border border-[#FDC316] rounded-tl-lg rounded-bl-lg">
//             <Image
//               src="/images/googleicon.png"
//               width={23}
//               height={23}
//               alt="icon"
//             />
//           </div>
//           <Button className="py-3 bg-[#FDC316] hover:bg-[#FDC316]/70 w-full h-[46px] text-black rounded-tl-none rounded-bl-none font-semibold text-[1rem]">
//             Sign in with Google
//           </Button>
//         </div>
//       </div>
//       <div className="flex w-full gap-2 justify-between items-center mb-4">
//         <hr className="border-[1px] border-gray-200 w-[30%]" />
//         <span className="grow text-center">Or sign in with facebook</span>
//         <hr className="border-[1px] border-gray-200 w-[30%]" />
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleFormSubmit)}>
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email_or_username"
//               render={({ field }) => (
//                 <FormItem className="relative">
//                   <FormLabel
//                     htmlFor="email_or_username"
//                     className="block text-sm font-medium mb-1"
//                   >
//                     Email or Username
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       id="email_or_username"
//                       type="text"
//                       {...field}
//                       placeholder="Enter your email or username"
//                       className="w-full h-12 rounded-lg"
//                     />
//                   </FormControl>
//                   <CircleUserRound className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   {form.formState.errors && (
//                     <FormMessage className="text-[#FDC316]">
//                       {form.formState.errors.email_or_username?.message}
//                     </FormMessage>
//                   )}
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem className="relative">
//                   <FormLabel
//                     htmlFor="password"
//                     className="block text-sm font-medium mb-1"
//                   >
//                     Password
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       className="w-full h-12 rounded-lg pr-10"
//                     />
//                   </FormControl>
//                   <Button
//                     type="button"
//                     variant="link"
//                     size={"icon"}
//                     className="absolute right-3 top-12 transform -translate-y-1/2 bg-transparent"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? (
//                       <EyeOffIcon className="text-gray-400 w-5 h-5" />
//                     ) : (
//                       <EyeIcon className="text-gray-400 w-5 h-5" />
//                     )}
//                   </Button>
//                   {form.formState.errors && (
//                     <FormMessage className="text-[#FDC316]">
//                       {form.formState.errors.password?.message}
//                     </FormMessage>
//                   )}
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center mb-6 ">
//               <Checkbox
//                 id="keep-signed-in"
//                 className="rounded-sm border-gray-500"
//               />
//               <label
//                 htmlFor="keep-signed-in"
//                 className="ml-2 text-sm text-gray-500"
//               >
//                 Keep me signed in
//               </label>
//             </div>
//             <Button
//               className="py-3 bg-[#FDC316] hover:bg-[#FDC316]/70 w-full h-[46px] text-black rounded-lg font-semibold text-[1rem]"
//               type="submit"
//               disabled={form.formState.isSubmitting || !form.formState.isValid}
//             >
//               {form.formState.isSubmitting ? "Loading..." : "Sign in"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//       <p className="text-base text-center text-gray-500 mt-4 mb-8 ">
//         By clicking Sign in, you agree to our{" "}
//         <Link href="#" className="text-black">
//           Terms of Service
//         </Link>{" "}
//         and{" "}
//         <Link href="#" className="text-black">
//           Privacy <br />
//           Policy
//         </Link>
//         .
//       </p>
//       <hr className="border-[1px] border-gray-200 w-full" />
//       <div className="flex justify-between text-base mt-6">
//         <Link href="#" className="hover:underline">
//           Forgot Password?
//         </Link>
//         <div>
//           New to dRollo?{" "}
//           <Link href="/signup" className="text-[#FBBC05] hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

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
import { signInAuth, handleGoogleSignIn } from "@/actions/userAuth";
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
            : JSON.stringify(response.error)
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
              JSON.stringify(response.data.user)
            );
            if (response.data.accessToken) {
              sessionStorage.setItem("accessToken", response.data.accessToken);
            }
            if (response.data.refreshToken) {
              sessionStorage.setItem(
                "refreshToken",
                response.data.refreshToken
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
              storageError
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

  const handleGoogleAuth = async () => {
    try {
      const result = await handleGoogleSignIn();
      if (result.authUrl) {
        window.location.href = result.authUrl;
      } else {
        setError("Failed to initiate Google sign-up");
      }
    } catch (error) {
      console.error("Error initiating Google sign up:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-sm text-gray-500 mb-2">WELCOME BACK</h2>
        <h1 className="text-2xl font-bold mb-6">Sign In to Your Account</h1>

        <div className="flex mb-4">
          <div className="w-12 h-12 bg-transparent border border-yellow-400 rounded-l-lg flex items-center justify-center">
            <Image src={Google} alt="Google Icon" width={24} height={24} />
          </div>

          <button
            className="w-full bg-yellow-400 text-black py-3 rounded-r-lg flex items-center justify-center"
            onClick={handleGoogleAuth}
          >
            Sign in with Google
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-[#171717]">
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
                placeholder="Enter your password"
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

export default SignInForm;
