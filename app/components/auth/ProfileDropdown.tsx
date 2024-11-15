import React, { useState } from "react";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, LogOut, Dot } from "lucide-react";
import { logOutAuth } from "@/actions/userAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ProfileDropdownProps {
  user: User | null;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsLoading(true);
    const { status_code, message, error } = await logOutAuth();
    if (status_code === 200) {
      console.log(message);

      route.push("/auth/sign-in");
    } else {
      console.error(error);
      // Handle the error, e.g., display a notification to the user
      toast({
        title: "Sign Out failed",
        description: error || "An unknown error occurred",
        variant: "destructive",
        className:
          "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 w-64">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
          {user?.username?.[0].toUpperCase()}
        </div>
        <div>
          <h3 className="text-gray-800 font-medium text-lg">
            {user?.username}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="secondary"
          className="flex items-center justify-between w-full hover:bg-gray-100 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <Plus size={18} color="#FFCD00" />
            <span>Add Wallet</span>
          </span>
          <Dot
            size={44}
            color="#FFCD00"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </Button>
        <Button
          variant="secondary"
          onClick={handleSignOut}
          className="flex items-center justify-between w-full hover:bg-gray-100 transition-colors"
          disabled={isLoading}
        >
          <span className="flex items-center space-x-2">
            {isLoading ? (
              <span className="animate-spin">
                <Dot size={44} color="#FFCD00" />
              </span>
            ) : (
              <LogOut size={18} color="#FFCD00" />
            )}
            <span>{isLoading ? "Signing Out..." : "Sign Out"}</span>
          </span>
          <Dot
            size={18}
            color="#FFCD00"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </Button>
      </div>

      <div className="mt-4 flex justify-between text-gray-500 text-sm">
        <Link href="#" className="hover:text-gray-800 transition-colors">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-gray-800 transition-colors">
          Terms of Service
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfileDropdown;
