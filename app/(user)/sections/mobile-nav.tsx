"use client";

import { cn } from "@/lib/utils";
import {
  BriefcaseBusinessIcon,
  CircleUserRoundIcon,
  HomeIcon,
  LucideIcon,
  SquarePlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 justify-between md:hidden fixed bottom-0 left-0 w-full py-2 px-4 bg-secondary z-50 border-t border-gray-300 dark:border-neutral-800">
      <MobileNavLink
        name="Home"
        href="/"
        isActive={"/" === pathname}
        IconComponent={HomeIcon}
      />
      <MobileNavLink
        name="Create"
        href="/create"
        isActive={"/create" === pathname}
        IconComponent={SquarePlusIcon}
      />
      <MobileNavLink
        name="Jobs"
        href="/jobs"
        isActive={pathname.startsWith("/jobs")}
        IconComponent={BriefcaseBusinessIcon}
      />
      <MobileNavLink
        name="Profile"
        href="/profile"
        isActive={"/profile" === pathname}
        IconComponent={CircleUserRoundIcon}
      />
    </div>
  );
};

interface MobileNavLinkProps {
  name: string;
  href: string;
  className?: string;
  IconComponent: LucideIcon;
  isActive?: boolean;
}
const MobileNavLink = ({
  name,
  href,
  className,
  IconComponent,
  isActive,
}: MobileNavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 rounded-xl w-full flex flex-col items-center gap-1 transition-colors hover:bg-[#FCF4AA] max-w-20",
        className,
      )}
    >
      <IconComponent
        className={cn("text-[#A3A3A3]", isActive && "text-[#FDC316]")}
      />
      <span
        className={cn(
          "text-sm text-black dark:text-white capitalize",
          isActive && "font-bold",
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export default MobileNav;
