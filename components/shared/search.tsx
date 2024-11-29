"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  placeholder?: string; // Optional placeholder for the input
  onSearch: (searchTerm: string) => void; // Callback function to handle search
  loading?: boolean; // Optional loading state
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm) {
      onSearch(searchTerm); // Trigger search when searchTerm changes
    }
  }, [searchTerm, onSearch]);

  return (
    <div className="relative flex space-x-3">
      <Input
        type="text"
        disabled={loading}
        value={searchTerm}
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[23rem] pl-9 text-[#171717] dark:text-neutral-100 font-medium bg-white dark:bg-transparent md:bg-[#fafafa] border-[0.8px] md:border border-[#e5e5e5] dark:border-neutral-800 rounded-full  placeholder:font-normal placeholder:text-[#919ba7] dark:placeholder:text-neutral-400"
      />

      {/* search icon */}
      <div
        className={`absolute inset-y-0 left-0 py-2 focus:outline-none inline-flex items-center`}
      >
        {searchTerm.trim().length > 1 ? (
          <X
            className="h-4 w-4 text-[#919ba7] dark:text-neutral-400 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
        ) : (
          <Search className="h-4 w-4 text-[#919ba7] dark:text-neutral-400" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
