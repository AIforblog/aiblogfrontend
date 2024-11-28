"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, type ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WalletProvider } from "@/context/walletContext";

// const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";
const projectId = "43d0ddd7e8d8d044bb96dd673bcd9f51";

const config = getDefaultConfig({
  appName: "Drello",
  projectId,
  chains: [base, baseSepolia],
  ssr: true,
});

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletProvider>{props.children}</WalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
