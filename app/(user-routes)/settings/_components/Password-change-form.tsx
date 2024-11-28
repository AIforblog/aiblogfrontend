"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/shared/button";

// Zod schema for validation
const passwordSchema = z
  .object({
    currentPassword: z
      .string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>; // Infer types from the schema

const checkPasswordStrength = (password: string) => {
  let strength = 0;
  const conditions = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  strength = Object.values(conditions).filter(Boolean).length;

  return { strength, conditions };
};

const PasswordChangeForm = ({ onCancel }: { onCancel: () => void }) => {
  const [strength, setStrength] = useState(0);
  const [conditions, setConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  
  const newPassword = watch("newPassword");

  React.useEffect(() => {
    if (newPassword) {
      const { strength, conditions } = checkPasswordStrength(newPassword);
      setStrength(strength);
      setConditions(conditions);
    } else {
      setStrength(0);
      setConditions({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    }
  }, [newPassword]);

  const getStrengthColor = () => {
    if (strength === 5) return "green";
    if (strength >= 3) return "#FFAE43";
    return "red";
  };

  const strengthPercentage = (strength / 5) * 100;

  const onSubmit = (data: PasswordFormData) => {
    console.log("Password changed", data);
    onCancel(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-semibold"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          {...register("currentPassword")}
          placeholder="Enter your current password"
          className="w-full px-4 py-2 border rounded-md mt-2"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-semibold">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register("newPassword")}
          placeholder="Enter your new password"
          className="w-full px-4 py-2 border rounded-md mt-2"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}

        {newPassword && (
          <div className="mt-4">
            <div className="relative h-2 rounded-md bg-gray-300">
              <div
                className="absolute h-2 rounded-md"
                style={{
                  width: `${strengthPercentage}%`,
                  backgroundColor: getStrengthColor(),
                }}
              ></div>
            </div>
            <div className="mt-2 text-sm">
              <p
                className={`${
                  strength === 5 ? "text-green-500" : "text-gray-500"
                }`}
              >
                {strength === 5
                  ? "Strong password!"
                  : strength >= 3
                  ? "Moderate password."
                  : "Weak password."}
              </p>
              {strength < 5 && (
                <ul className="list-disc pl-5 text-sm">
                  {!conditions.special && (
                    <li className="text-red-500">Add a special character</li>
                  )}
                  {!conditions.uppercase && (
                    <li className="text-red-500">Use at least one uppercase letter</li>
                  )}
                  {!conditions.lowercase && (
                    <li className="text-red-500">Use at least one lowercase letter</li>
                  )}
                  {!conditions.number && (
                    <li className="text-red-500">Add at least one number</li>
                  )}
                  {!conditions.length && (
                    <li className="text-red-500">Increase password length</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder="Confirm your new password"
          className="w-full px-4 py-2 border rounded-md mt-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex justify-between lg:justify-end mt-4 gap-5">
        <Button
          variant={"outline"}
          onClick={onCancel} 
          className="w-full sm:w-auto rounded-full text-xs border-black h-auto"
        >
          Cancel
        </Button>

        <Button className="w-full sm:w-auto bg-[#fdc316] text-xs hover:bg-[hsl(45,98%,49%)] rounded-full h-auto ">
          Save
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
