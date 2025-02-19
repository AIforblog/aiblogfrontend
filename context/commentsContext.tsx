"use client";
import { assertUserAuthenticated } from "@/lib/auth";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { ItemComment } from "@/types/comment";
import { getComments } from "@/actions/socials";


// import { fcm } from "@/lib/FirebaseConfig/firebaseConfig";
// import { getToken, onMessage } from "firebase/messaging";
// import { toast } from "sonner";
// import {
// NEXT_PUBLIC_FIREBASE_VAPID_KEY } from "@/lib/constants"


interface CommentsContextProps {
    comments: ItemComment[] | null;
    setComments: (comments: ItemComment[]) => void;
    clearComments: () => void;
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
    fetchComments: (organizationId: string)=> Promise<void>
  }

const CommentsContext = createContext<CommentsContextProps | undefined>(undefined);

export const CommentsProvider = ({ children, organizationId }: { children: ReactNode, organizationId: string }) => {
  const [comments, setCommentsState] = useState<ItemComment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setComments = (comments: ItemComment[]) => {
    setCommentsState(comments);
  };

  const clearComments = () => {
    setCommentsState(null);
  };

  const fetchComments =useCallback( async (organizationId: string) => {
    setLoading(true);
    const userInfo = await assertUserAuthenticated();
    if (userInfo.accessToken.value == "") {
      return;
    }
    try {
      const response = await getComments(
       organizationId
      );
      if (response) {
        setCommentsState(response);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  },[]);
  useEffect(() => {

    fetchComments(organizationId);
  }, [organizationId, fetchComments]);

  //  useEffect(()=>{
  //   function requestPermission() {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         console.debug("Notification permission granted.");
  //       } else {
  //         console.debug("Notification permission denied.");
  //       }
  //     });
  //   }

  //   getToken(fcm, { vapidKey: NEXT_PUBLIC_FIREBASE_VAPID_KEY })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         localStorage.setItem("fcmToken", currentToken);
  //       } else {
  //         requestPermission();
  //       }
  //     })
  //     .catch(() => {
  //       console.debug("An error occurred while retrieving token. ");
  //     });

  //   onMessage(fcm, (payload) => {
  //     toast(payload.notification?.title as string);

  // });
  //  },[])
  return (
    <CommentsContext.Provider
      value={{ comments, setComments, clearComments, loading, setLoading, fetchComments }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = (): CommentsContextProps => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
