import { cookies } from "next/headers";
import {
  //   authConfig,
  setSecureCookie,
  deleteSecureCookie,
} from "@/config/auth.config";

export const WALLET_COOKIE_KEY = "walletAddress";

export const saveWalletAddress = (address: string) => {
  const cookieStore = cookies();
  setSecureCookie(cookieStore, WALLET_COOKIE_KEY, address);
};

export const deleteWalletAddress = () => {
  const cookieStore = cookies();
  deleteSecureCookie(cookieStore, WALLET_COOKIE_KEY);
};
