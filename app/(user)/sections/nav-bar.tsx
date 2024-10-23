"use client";

import { RoundedImage, SearchInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { UserData } from "@/data/mock/user";
import { Bell, Edit3Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./mobile-nav";

interface NavLinksProps {
  routeName: string;
  route: string;
}

const NavBar = () => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const navLinks: NavLinksProps[] = [
    { route: "/", routeName: "Home" },
    { route: "/explore", routeName: "Explore" },
    { route: "/jobs", routeName: "Jobs" },
  ];

  const router = useRouter();

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // Function to handle routing
  const handleRoute = (path: string) => () => {
    router.push(path);
    setActiveLink(path);
  };

  // Example | Re-implement
  const handleSearch = (searchTerm: string) => {
    console.log({ searchTerm });
  };

  return (
    <>
      <header className="container hidden md:flex items-center sticky top-0 z-50 w-full h-[4.5rem] bg-white border-b border-[#E7E5E4]">
        <div className="flex flex-row items-center gap-x-16 mr-auto">
          {/* Logo */}
          <div>
            <h2>Logo</h2>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="md:flex flex-row items-center gap-x-11 hidden">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative transition-transform duration-300 ease-in-out"
                >
                  <p
                    onClick={handleRoute(link.route)}
                    className={`nav-link text-base capitalize hover:cursor-pointer hover:text-[#fdc316] transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wide ${
                      activeLink === link.route
                        ? "text-[#fdc316] font-bold"
                        : "text-[#171717] font-normal "
                    }`}
                  >
                    {link.routeName}
                  </p>

                  {/* Underline effect */}
                  <span
                    className={`absolute left-0 bottom-[-0.5rem] w-full h-[1.5px] bg-[#fdc316] transition-all duration-300 ease-in-out transform ${
                      activeLink === link.route || activeLink === link.route
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    } hover:translate-y-0 hover:opacity-100`}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden md:flex flex-row items-center gap-x-6 ml-auto">
          {/* Search */}
          <div className="hidden xl:block">
            <SearchInput onSearch={handleSearch} placeholder="Find..." />
          </div>

          {/* Write to earn btn */}
          <Link href={"/write"}>
            <Button className="bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] rounded-full py-3 gap-x-2 flex justify-center items-center transition duration-300 ease-in-out">
              <Edit3Icon className="h-4 w-4 text-[#262626]" />
              <span className="font-medium text-[#262626] text-center">
                Write to earn
              </span>
            </Button>
          </Link>

          {/* Notification */}
          <div className="flex-1 border rounded-full w-10 h-10 flex items-center justify-center hover:cursor-pointer hover:border-none hover:bg-[#fdc316] transition duration-300 ease-in-out">
            <Bell className="h-[18px] w-[18px] text-[#262626] " />
          </div>

          {/* User profile */}
          <RoundedImage
            size={40}
            src={UserData.profile_pic}
            alt={`${UserData.username} profile pic`}
          />
        </div>
      </header>
      <MobileNav />
    </>
  );
};

export default NavBar;
