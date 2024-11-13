import React from "react";
import Navbar from "@/components/admin/Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#D4D4D4]">
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
