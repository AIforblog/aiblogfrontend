"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoundedImage, SearchInput, ThemeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { UserData } from "@/data/mock/user";
import {
  Bell,
  ChevronDown,
  Edit3Icon,
  LogOut,
  Settings,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./mobile-nav";
import Image from "next/image";
import LogoDark from "@/public/assets/icons/logo-dark.svg";
import { useUser } from "@/context/userProfilectx";


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
  const {user, loading} = useUser()
  console.log(user)
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // Function to handle routing
  const handleRoute = (path: string) => () => {
    router.push(path);
    setActiveLink(path);
  };

  // Re-implement your search functionality here! 🌚
  const handleSearch = (searchTerm: string) => {
    console.log({ searchTerm });
  };

  return (
    <>
      <header className="md:px-12 2xl:px-[8rem] hidden md:flex items-center sticky top-0 z-50 w-full h-[4.5rem] bg-white dark:bg-black/90 border-b border-[#E7E5E4] dark:border-neutral-800">
        <div className="flex flex-row items-center gap-x-16 mr-auto">
          {/* Logo */}
          <a href="/">
            <Image src={LogoDark} alt="Drello" className="w-16" />
          </a>

          {/* Nav links */}
          <nav>
            <ul className="md:flex flex-row items-center gap-x-11 hidden">
              {navLinks.map((link) => (
                <li
                  key={link.routeName}
                  className="relative transition-transform duration-300 ease-in-out"
                >
                  <p
                    onClick={handleRoute(link.route)}
                    className={`nav-link text-base capitalize hover:cursor-pointer hover:text-[#fdc316] transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wide ${
                      activeLink === link.route
                        ? "text-[#fdc316] font-bold"
                        : "text-[#171717] dark:text-neutral-50 font-normal"
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
          <div className="hidden md:block">
            <SearchInput onSearch={handleSearch} placeholder="Find..." />
          </div>
          {/* Write to earn btn */}
          <Link href={"/create"}>
            <Button className="bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] rounded-full py-3 gap-x-2 flex justify-center items-center transition duration-300 ease-in-out">
              <Edit3Icon className="h-4 w-4 text-[#262626]" />
              <span className="font-medium text-[#262626] text-center">
                Write to earn
              </span>
            </Button>
          </Link>
          {/* Notification */}
          <div className="flex-1 border border-[#262626] dark:border-neutral-800 rounded-full w-9 h-9 flex items-center justify-center group hover:cursor-pointer hover:border-none hover:bg-[#fdc316] transition duration-300 ease-in-out">
            <Bell className="h-[18px] w-[18px] text-[#262626] dark:text-neutral-400 group-hover:dark:text-black/60" />
          </div>
          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="p-0 hover:cursor-pointer ring-0 outline-0 focus-within:ring-0 focus-within:outline-0 focus-visible:outline-0 focus-visible:ring-0"
            >
              {!loading &&
              <div className="flex flex-row gap-x-1 items-center">
                <RoundedImage
                  size={40}
                  src={user?.profilePic || UserData.profilePic}
                  alt={`${UserData.username} profile pic`}
            
                />

                <ChevronDown className="w-5 h-5 text-black/70 -mt-2 text-[#262626] dark:text-neutral-400" />
              </div>
              }
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[10rem] rounded-lg flex flex-col  mt-4 mr-12 border  bg-white dark:bg-black">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex flex-col">
                <DropdownMenuItem className="px-2 rounded-none cursor-pointer group">
                  <Link className="flex items-center gap-x-1.5 py-1" href="/profile">
                    <UserIcon className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316] group-hover:fill-[#fdc316]" />
                    <span className="text-sm font-medium text-[#171717] dark:text-neutral-50 leading-none -mb-[0.5px]">
                      Profile
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="px-2 rounded-none cursor-pointer group">
                  <div className="flex items-center gap-x-1.5 py-1">
                    <Settings className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316]" />
                    <span className="text-sm font-medium text-[#171717] dark:text-neutral-50 leading-none -mb-[0.5px]">
                      Settings
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="px-2 rounded-none cursor-pointer group">
                  <ThemeToggle />
                </DropdownMenuItem>

                <DropdownMenuItem className="px-2 rounded-none cursor-pointer group">
                  <div className="flex items-center gap-x-1.5 py-1">
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-red-500 leading-none -mb-[0.5px]">
                      Log out
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <MobileNav />
    </>
  );
};

export default NavBar;
