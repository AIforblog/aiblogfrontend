"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PasswordChangeForm from "./Password-change-form";

function PasswordReset() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="space-y-6 w-full">
      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow:
            "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div>
          <div className="border-b pb-2 mb-4">
            <h2 className="text-2xl font-bold leading-[1.375]">Password Reset</h2>
          </div>

         
          {!isFormVisible && (
            <div className="password">
              <p>Password</p>
              <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col">
                <p className="w-fit text-[#A3A3A3] mt-0">**********</p>
                <Button
                  variant="outline"
                  onClick={toggleFormVisibility}
                  className="rounded-full text-xs border-black h-auto w-fit mt-4 sm:mt-0"
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>

        {isFormVisible && (
          <PasswordChangeForm onCancel={toggleFormVisibility} />
        )}
      </div>
    </div>
  );
}

export default PasswordReset;
