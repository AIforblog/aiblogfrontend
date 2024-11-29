"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="flex items-center gap-x-1.5 py-1">
      <>
        {theme === "light" ? (
          <SunIcon className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <MoonIcon className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </>
      <span className="text-sm font-medium text-[#171717] dark:text-neutral-50 leading-none">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
