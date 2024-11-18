// components/wallet/WalletConnect.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useWallet } from "@/context/walletContext";

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
          <div className="w-full space-y-2">
            <Button
              variant="secondary"
              className="flex items-center justify-between w-full hover:bg-gray-100 transition-colors"
              onClick={mounted && account ? openAccountModal : openConnectModal}
            >
              <span className="flex items-center space-x-2">
                {mounted && account ? (
                  <Wallet size={18} color="#FFCD00" />
                ) : (
                  <Plus size={18} color="#FFCD00" />
                )}
                <span>
                  {mounted && account
                    ? `${account.address.substring(
                        0,
                        6
                      )}...${account.address.substring(
                        account.address.length - 4
                      )}`
                    : "Connect Wallet"}
                </span>
              </span>
            </Button>

            {isUnsupportedChain && (
              <Button
                variant="destructive"
                className="flex items-center justify-between w-full"
                onClick={openChainModal}
              >
                <span className="flex items-center space-x-2">
                  <RefreshCw size={18} />
                  <span>Switch Network</span>
                </span>
              </Button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
