import { SectionTitle } from "@/components/shared";
import "../globals.css";
import { NavBar, TrendingTopics, TopWriters } from "../(user)/sections";
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

      <main className="w-[1200px] mx-auto pt-6 overflow-hidden maxHeight bg-[inherit] gap-6 grid grid-cols-4 max-[1250px]:w-[initial] max-[1250px]:mx-4 max-[768px]:mx-0">
        {/* Blog */}

        <section className="w-full flex-1 h-full overflow-y-scroll custom-scroll maxHeight md:col-span-3 col-span-4 border border-[#E5E5E5] dark:border-neutral-800 max-[768px]:border-none mb-4 text-black dark:text-white">
          {children}
        </section>

        {/* Trending topics | Top writers */}

        <section className="col-span-1 hidden md:block">
          <div
            className={`h-[88vh] grid ${
              user === "authenticated" ? "grid-rows-2" : "grid-rows-3"
            } gap-y-6 overflow-hidden`}
          >
            <section className="row-span-1  overflow-hidden">
              <SectionTitle title="Trending Topics" />
              <Suspense>
                <TrendingTopics />
              </Suspense>
            </section>

            <section
              className={`${
                user === "authenticated"
                  ? "row-span-2"
                  : "row-span-1 hidden md:block"
              }`}
            >
              <SectionTitle title="Top Writers" />
              <TopWriters />
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
