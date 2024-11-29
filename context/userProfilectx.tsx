import { getUserProfile } from '@/actions/profile';
import { assertUserAuthenticated } from '@/lib/auth';
import { UserProps } from '@/types/user';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface UserContextProps {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
  loading: boolean;
   setLoading: (isLoading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserProps | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

  const setUser = (newUser: UserProps) => {
    setUserState(newUser);
  };

  const clearUser = () => {
    setUserState(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userInfo = await assertUserAuthenticated();
      if(userInfo.accessToken.value == ""){
        return
      }
      try { 
        const userProfile = await  getUserProfile(
    userInfo.accessToken.value as string,
    userInfo.userId as string
        )
        if (userProfile) {
          setUserState(userProfile.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  },[]); 


  return (
    <UserContext.Provider value={{ user, setUser, clearUser , loading , setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
