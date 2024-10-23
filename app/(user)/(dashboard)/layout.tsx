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

      <main className="container w-full maxHeight overflow-hidden md:pt-6 bg-[#FAFAFA] gap-6 grid grid-cols-1 md:grid-cols-4">
        {/* Featured article */}
        <section className="hidden md:block col-span-1">
          <SectionTitle title="Featured Articles" />
          <FeaturedArticles />
        </section>

        {/* Blog */}
        <section className="w-full flex-1 h-full md:col-span-2 px-6 pt-6 bg-[#F5F5F5] rounded-tl-xl rounded-tr-xl">
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
      </main>
    </>
  );
}
