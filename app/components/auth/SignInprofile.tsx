// components/SignProfileComponent/index.tsx
import React, { useEffect, useState } from "react";
import { assertUserAuthenticated } from "@/lib/auth";
import { User } from "@/types/auth";
import { RoundedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";

const SignProfileComponent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const route = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { accessToken, user } = await assertUserAuthenticated();
        setIsAuthenticated(true);
        setUser(user);
        console.log(accessToken);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);

        throw error;
      }
    };
    checkAuthentication();
  }, []);

  const handleProfileClick = () => {
    // Implement your profile dropdown logic here
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInClick = () => {
    route.push("/auth/sign-in");
  };

  return (
    <div className="flex items-center justify-center">
      {isAuthenticated ? (
        <div className="relative">
          <div
            className="flex items-center space-x-4 cursor-pointer "
            onClick={handleProfileClick}
          >
            {user?.avatar_url ? (
              <RoundedImage
                size={40}
                src={user.avatar_url}
                alt={`${user.username} profile pic`}
              />
            ) : (
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold hover:cursor-pointer hover:border-none hover:bg-[#fdc316] transition duration-300 ease-in-out">
                {user?.username?.[0].toUpperCase()}
              </div>
            )}
            {/* <p className="text-sm font-medium">Hi, {user?.username}</p> */}
          </div>
          {isDropdownOpen && <ProfileDropdown user={user} />}
        </div>
      ) : (
        <Button
          type="submit"
          className="w-full bg-yellow-400 text-black  rounded-full py-3 hover:text-white  flex items-center justify-center "
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default SignProfileComponent;
