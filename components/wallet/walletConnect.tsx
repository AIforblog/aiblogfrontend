import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useWallet } from "@/context/walletContext";
import { Wallet, Plus, RefreshCw } from "lucide-react";

export const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connectWallet } = useWallet();

  useEffect(() => {
    if (isConnected && address) {
      connectWallet(address);
    }
  }, [isConnected, address, connectWallet]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const isUnsupportedChain = chain && chain.unsupported;

        return (
          <>
            <div className="flex items-center gap-x-1.5 py-1 w-full cursor-pointer group">
              {mounted && account ? (
                <Wallet className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316] group-hover:fill-[#fdc316]" />
              ) : (
                <Plus className="w-5 h-5 text-black/70 dark:text-neutral-50 group-hover:text-[#fdc316] group-hover:fill-[#fdc316]" />
              )}
              <span
                onClick={
                  mounted && account ? openAccountModal : openConnectModal
                }
                className="text-sm font-medium text-[#171717] dark:text-neutral-50 leading-none -mb-[0.5px]"
              >
                {mounted && account
                  ? `${account.address.substring(
                      0,
                      6
                    )}...${account.address.substring(
                      account.address.length - 4
                    )}`
                  : "Connect Wallet"}
              </span>
            </div>

            {isUnsupportedChain && (
              <div
                onClick={openChainModal}
                className="flex items-center gap-x-1.5 py-1 w-full cursor-pointer group text-red-500"
              >
                <RefreshCw className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium leading-none -mb-[0.5px]">
                  Switch Network
                </span>
              </div>
            )}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
