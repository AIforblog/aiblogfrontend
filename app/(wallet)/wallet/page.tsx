import WalletDashboard from "@/components/wallet/wallet-dashboard";



export const metadata = {
  title: 'My Wallet | dRello',
  description: 'View your wallet balance and transaction history on dRello',
};

export default function WalletPage() {
  return (
    <WalletDashboard />
  );
}
