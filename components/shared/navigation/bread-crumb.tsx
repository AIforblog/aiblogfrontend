"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <li key={href} className="flex items-center">
              <Link href={href} className="text-blue-600 hover:underline">
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
              {index < pathSegments.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
