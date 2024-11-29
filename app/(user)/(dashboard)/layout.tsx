"use client"
import { SectionTitle } from "@/components/shared";
import "../../globals.css";
import {
  FeaturedArticles,
  NavBar,
  TopWriters,
  TrendingTopics,
} from "../sections";


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

      <main className="flex justify-center">
        <div className="container mx-auto px-4 md:px-12 2xl:px-[8rem] w-full maxHeight overflow-hidden md:pt-6 bg-white md:bg-[#FAFAFA] dark:bg-black/90 gap-6 grid grid-cols-1 md:grid-cols-4 place-content-center place-items-center">
          {/* Featured article */}
          <section className="hidden md:block col-span-1">
            <SectionTitle title="Featured Articles" />
            <FeaturedArticles />
          </section>

          {/* Blog | Jobs */}
          <section className="w-full flex-1 h-full md:col-span-2 md:px-6 mt-10 md:pt-6 bg-white md:bg-[#F5F5F5] dark:bg-black/90 border border-[#E5E5E5] dark:border-neutral-800 rounded-tl-xl rounded-tr-xl">
            {children}
          </section>

          {/* Trending topics | Top writers */}
          <section className="hidden md:block col-span-1">
            <div
              className={`h-[88vh] grid ${
                user === "authenticated" ? "grid-rows-2" : "grid-rows-3"
              } gap-y-6 overflow-hidden`}
            >
              <section className="row-span-1 overflow-hidden">
                <SectionTitle title="Trending Topics" />
                <TrendingTopics />
              </section>

              <section
                className={`${
                  user === "authenticated" ? "row-span-2" : "row-span-1"
                }`}
              >
                <SectionTitle title="Top Writers" />
                <TopWriters />
              </section>
            </div>
          </section>
        </div>
      </main>
      
    </>
  );
}
