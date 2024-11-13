"use client";

import { NavBar } from "@/app/(user)/sections";

import { PropsWithChildren } from "react";
import { BackButton } from "./_components/back-button";
import { Breadcrumb } from "./_components/breadcrumb";
import { Aside } from "./_components/aside";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-dvh">
      <NavBar />
      <div className="py-8 px-10 lg:py-14 lg:px-20 bg-[#FAFAFA] grow flex flex-col overflow-hidden">
        <div className="w-full h-full bg-white rounded-[24px] p-6 flex flex-col grow gap-6">
          <header className="space-y-1">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold leading-[1.375]">Settings</h1>
            </div>
            <Breadcrumb />
          </header>
          <div className="relative grow">
            <div className="absolute inset-0 flex gap-8">
              <Aside />
              <div
                className="grow bg-neutral-50 border p-6 rounded-[24px]"
                style={{
                  boxShadow: "0px 10px 15px -3px #1018281A, 0px 4px 6px -4px #1018281A",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
