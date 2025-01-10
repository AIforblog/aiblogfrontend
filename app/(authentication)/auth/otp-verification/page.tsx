"use client";
import React, { useState, useEffect, useRef } from "react";
import OtpInputComponent from "../../../components/auth/otpinput";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import iconGmail from "../../../../public/assets/icons/iconGmail.svg";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { requestNewOtp, validateOtp } from "@/actions/userAuth";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [censoredEmail, setCensoredEmail] = useState("");
  const [error, setError] = useState("");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(60);
  const router = useRouter();
  const otpInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("userEmail");
      setEmail(storedEmail || "avioflagos@gmail.com"); // Use placeholder if no email in storage
    }
  }, []);

  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
    setCensoredEmail(censorEmail(email));
  }, [email]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const censorEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const censoredUser = user.slice(0, 3) + "***";
    return `${censoredUser}@${domain}`;
  };

  // const handleOtpSubmit = async () => {
  //   const otpValue = otp.join("");

  //   if (otpValue && email) {
  //     setIsLoading(true);
  //     setError("");

  //     try {
  //       const result = await mockVerifyOtp(email, otpValue);
  //       if (result.success) {
  //         toast({
  //           title: "OTP Verified Successfully",
  //           description: "You will be redirected shortly.",
  //           className:
  //             "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
  //         });
  //         router.push("/");
  //       } else {
  //         setError(result.message);
  //         setIsTokenExpired(result.isTokenExpired || false);
  //         toast({
  //           title: "Verification failed",
  //           description: result.message,
  //           variant: "destructive",
  //           className:
  //             "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //         });
  //         if (result.isTokenExpired) {
  //           setCountdown(0);
  //         }
  //       }
  //     } catch (err) {
  //       const errorMessage =
  //         err instanceof Error ? err.message : "An unexpected error occurred";
  //       setError(errorMessage);
  //       toast({
  //         title: "Verification failed",
  //         description: "An unexpected error occurred",
  //         variant: "destructive",
  //         className:
  //           "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // const handleResendOtp = async () => {
  //   if (countdown > 0) {
  //     toast({
  //       title: "Please wait",
  //       description: `Please wait ${countdown} seconds before requesting a new OTP`,
  //       className:
  //         "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 shadow-md",
  //     });
  //     return;
  //   }
  //   setResendLoading(true);
  //   try {
  //     const result = await mockRequestPasswordReset();
  //     if (result.success) {
  //       toast({
  //         title: "Verification Email Sent",
  //         description: "A new OTP has been sent to your email",
  //         className:
  //           "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
  //       });
  //       setCountdown(60);
  //     } else {
  //       setError(result.message || "Failed to resend OTP");
  //       toast({
  //         title: "Failed to resend OTP",
  //         description: result.message || "Failed to resend OTP",
  //         variant: "destructive",
  //         className:
  //           "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //       });
  //     }
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "An unexpected error occurred";
  //     setError(errorMessage);
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred",
  //       variant: "destructive",
  //       className:
  //         "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
  //     });
  //   } finally {
  //     setResendLoading(false);
  //   }
  // };

  const handleOtpSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue && email) {
      setIsLoading(true);
      setError("");

      try {
        const result = await validateOtp(email, otpValue);
        if (result.success) {
          toast({
            title: "OTP Verified Successfully",
            description: "You will be redirected shortly.",
            className:
              "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
          });
          router.push("/");
        } else {
          setError(result.message || "OTP validation failed");
          setIsTokenExpired(result.isTokenExpired || false);
          toast({
            title: "Verification failed",
            description: result.message || "OTP validation failed",
            variant: "destructive",
            className:
              "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
          });
          if (result.isTokenExpired) {
            setCountdown(0);
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        toast({
          title: "Verification failed",
          description: errorMessage,
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) {
      toast({
        title: "Please wait",
        description: `Please wait ${countdown} seconds before requesting a new OTP`,
        className:
          "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 shadow-md",
      });
      return;
    }
    setResendLoading(true);
    try {
      const result = await requestNewOtp(email);
      if (result.success) {
        toast({
          title: "Verification Email Sent",
          description: "A new OTP has been sent to your email",
          className:
            "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
        });
        setCountdown(60);
      } else {
        setError(result.message || "Failed to resend OTP");
        toast({
          title: "Failed to resend OTP",
          description: result.message || "Failed to resend OTP",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        className:
          "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">
          We&apos;ve sent you a code. Check your email!
        </h1>
        <p className="text-gray-600 mb-6">
          We sent a code to {censoredEmail}, kindly verify to proceed.
        </p>

        <div className="flex justify-between mb-6">
          <OtpInputComponent otp={otp} setOtp={setOtp} />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isTokenExpired && (
          <p className="text-yellow-500 mb-4">
            Your OTP has expired. Please request a new one.
          </p>
        )}

        <Button
          onClick={handleOtpSubmit}
          color="primary"
          disabled={isLoading}
          className="w-full bg-[#FDC316] hover:bg-yellow-500 text-black font-semibold py-3 rounded-md mb-4"
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
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Verify "
          )}
        </Button>

        <div className="flex justify-center items-center mb-4">
          <Image src={iconGmail} alt="Gmail" className="w-5 h-5 mr-2" />
          <a
            href="https://gmail.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Open Gmail
          </a>
        </div>

        <p className="text-center text-sm">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <span>
            <a
              href="#"
              onClick={handleResendOtp}
              className={`text-[#F7A609] hover:underline ${
                countdown > 0 || resendLoading
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              {resendLoading
                ? "Sending..."
                : countdown > 0
                  ? `request a new code (${countdown}s)`
                  : "request a new code"}
            </a>
          </span>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default OtpVerificationPage;
