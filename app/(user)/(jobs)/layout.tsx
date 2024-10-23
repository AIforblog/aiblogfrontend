import { NavBar } from "@/app/(user)/sections";
import "../../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="mt-0 md:pt-6 bg-white md:bg-[#fafafa]">{children}</main>
    </>
  );
}
