import EarningsSidebar from "@/components/wallet/wallet-sidebar";
import { NavBar } from "../(user)/sections";

export const metadata = {
  title: "dRello",
  description: "Decentralized task management and earning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="maxHeight overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-8  max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-8">
        <main className="col-span-2 relative">{children}</main>

        <div>
          {/* header */}
          <EarningsSidebar />
        </div>
      </div>
    </>
  );
}
