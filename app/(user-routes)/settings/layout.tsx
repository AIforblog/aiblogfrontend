"use client";

import { NavBar } from "@/app/(user)/sections";

import { PropsWithChildren, useRef } from "react";
import { BackButton } from "./_components/back-button";
import { Breadcrumb } from "./_components/breadcrumb";
import { Aside } from "./_components/aside";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function SettingsLayout({ children }: PropsWithChildren) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-dvh pb-20 md:pb-0">
      <NavBar />
      <div className="md:py-8 md:px-8 mx-auto min-[1440px]:py-14 max-w-[1312px] w-full bg-[#FAFAFA] grow flex flex-col overflow-hidden">
        <div className="w-full h-full bg-white md:rounded-[24px] pt-6 md:p-6 flex flex-col grow gap-6">
          <header className="space-y-2 px-4 md:px-0">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold leading-[1.375]">Settings</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="md:hidden h-8">
                <Aside sidebarContainer={sidebarContainerRef.current || undefined} />
              </div>
              <Breadcrumb />
            </div>
          </header>
          <div className="relative grow">
            <div className="absolute inset-0 flex gap-8" ref={sidebarContainerRef}>
              <div className="hidden md:block w-[400px] max-w-[40%] h-full overflow-y-auto custom-scroll">
                <Aside />
              </div>
              <div
                className="grow md:bg-neutral-50 md:border p-4 md:p-6 rounded-[24px] overflow-y-auto"
                style={{
                  boxShadow: isDesktop
                    ? "0px 10px 15px -3px #1018281A, 0px 4px 6px -4px #1018281A"
                    : undefined,
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
