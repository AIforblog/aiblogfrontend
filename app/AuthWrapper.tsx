"use client";

import { useEffect, useState } from "react";
import { UnauthenticatedBanner } from "@/components/shared/unauthenticatedUserActions";
import { assertUserAuthenticated } from "@/lib/auth";
import { usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authResult = await assertUserAuthenticated();
      setIsAuthenticated(!!authResult);
    };

    checkAuthentication();

    // Listen for custom authentication event
    const handleAuthSuccess = () => {
      setIsAuthenticated(true);
    };

    window.addEventListener("auth-success", handleAuthSuccess);

    return () => {
      window.removeEventListener("auth-success", handleAuthSuccess);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {isAuthenticated === false && <UnauthenticatedBanner />}
    </>
  );
}
