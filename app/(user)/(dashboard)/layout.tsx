"use client";
import { SectionTitle } from "@/components/shared";
import "../../globals.css";
import {
  FeaturedArticles,
  NavBar,
  TopWriters,
  TrendingTopics,
} from "../sections";
import { Suspense } from "react";

// For the grid, to check if the user is
// authenticated and change the layout accordingly
const user = "authenticated";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Navigation */}

      <NavBar />

      <main className="w-[1200px] mx-auto flex justify-center mt-4 overflow-hidden h-[85vh] max-[1150px]:w-[initial] max-[1150px]:mx-4">
        <div className="grid grid-cols-4 gap-4 max-[1065px]:gap-0 max-[1065px]:grid-cols-3 max-[965px]:gap-4 max-[915px]:grid-cols-2 max-[665px]:grid-cols-1">
          {/* Featured article */}

          <section className="w-full col-span-1 max-[665px]:hidden">
            <SectionTitle className="text-sm" title="Featured Articles" />
            <FeaturedArticles />
          </section>

          {/* Blog | Jobs */}

          <section className="w-full flex-1 col-span-2 max-[1065px]:col-span-1 max-[965px]:col-span-2 max-[915px]:col-span-1 border-[#E5E5E5] dark:border-neutral-800 rounded-tl-xl rounded-tr-xl">
            {children}
          </section>

          {/* Trending topics | Top writers */}

          <section className="col-span-1 max-[965px]:hidden">
            <div
              className={`h-[88vh] grid ${
                user === "authenticated" ? "grid-rows-2" : "grid-rows-3"
              } gap-y-4 overflow-hidden`}
            >
              <section className="row-span-1 overflow-hidden">
                <SectionTitle className="text-sm" title="Trending Topics" />
                <Suspense fallback={<div>loading........</div>}>
                  <TrendingTopics />
                </Suspense>
              </section>

              <section
                className={`${
                  user === "authenticated" ? "row-span-2" : "row-span-1"
                }`}
              >
                <SectionTitle className="text-sm" title="Top Writers" />
                <Suspense fallback={<div>loading........</div>}>
                  <TopWriters />
                </Suspense>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
