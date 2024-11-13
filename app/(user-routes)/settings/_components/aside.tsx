"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";

export const Aside = () => {
  return (
    <aside
      className="w-[400px] rounded-[16px] border bg-neutral-50 py-6 px-4 flex flex-col gap-6 overflow-y-auto custom-scroll"
      style={{
        boxShadow: "0px 10px 15px -3px #1018281A, 0px 4px 6px -4px #1018281A",
      }}
    >
      <ul className="space-y-4 grow">
        <li>
          <AsideLink href={"/settings/general"}>General Settings</AsideLink>
        </li>
        <li>
          <AsideLink href={"/settings/security"}>Security Settings</AsideLink>
        </li>
        <li>
          <AsideLink href={"/settings/web3"}>Web 3 and Wallet Settings</AsideLink>
        </li>
        <li>
          <AsideLink href={"/settings/privacy"}>Privacy Settings</AsideLink>
        </li>
        <li>
          <AsideLink href={"/settings/earning"}>Earning and Payment Settings</AsideLink>
        </li>
      </ul>

      <ul className="flex flex-wrap text-sm list-disc list-inside gap-3">
        <li>Legal</li>
        <li>Contact Support</li>
        <li>FAQ</li>
        <li>Feedback</li>
      </ul>

      <button
        className="w-full rounded-xl text-center text-[#B10909] text-lg py-2 px-4  font-medium hover:bg-neutral-100"
        type="button"
      >
        Logout
      </button>
    </aside>
  );
};

const AsideLink = ({ className, href, ...restProps }: ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "p-4 block  transition-colors w-full rounded-xl text-xl leading-[1.4] font-medium",
        isActive && "bg-[#FCF4AA] hover:bg-[#f7e867] border-r-4 border-[#BF9005]",
        !isActive && "bg-neutral-100 hover:bg-neutral-200 border",
        className
      )}
      {...restProps}
    />
  );
};
