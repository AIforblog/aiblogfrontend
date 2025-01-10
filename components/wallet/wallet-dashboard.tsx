"use client";
import { useState, useEffect } from "react";
import { Copy, EyeIcon, EyeOff, LogOut } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WalletModals from "./wallet-modal";
import { useWallet } from "@/context/walletContext";
import { useAccount, useBalance } from "wagmi";

export default function WalletDashboard() {
  const { walletAddress, disconnectWallet } = useWallet();
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
  });

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([
    {
      type: "connection",
      date: new Date().toLocaleDateString(),
      amount: "0 ETH",
    },
  ]);

  const [showBalance, setShowBalance] = useState<boolean>(false);

  useEffect(() => {
    if (balanceData) {
      const ethBalance = parseFloat(balanceData.formatted);
      const usdBalance = ethBalance * 2500;
      setBalance(usdBalance);
    }
  }, [balanceData]);

  const handleDeposit = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions((prevTransactions) => [
      {
        type: "deposit",
        date: new Date().toLocaleDateString(),
        amount: `+${amount} ETH`,
      },
      ...prevTransactions,
    ]);
  };

  const handleWithdraw = (amount: number) => {
    if (amount <= balance) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions((prevTransactions) => [
        {
          type: "withdrawal",
          date: new Date().toLocaleDateString(),
          amount: `-${amount} ETH`,
        },
        ...prevTransactions,
      ]);
    } else {
      alert("Insufficient funds");
    }
  };

  const openBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setTransactions([]);
    setBalance(0);
  };

  const displayAddress = walletAddress
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(
        walletAddress.length - 4,
      )}`
    : "Not Connected";

  if (!walletAddress) {
    return (
      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <h2 className="text-xl font-bold mb-4">Wallet Not Connected</h2>
          <p>Please connect your wallet to view your dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 maxHeight overflow-scroll custom-scroll">
      <CardHeader>
        <CardTitle>My Wallet</CardTitle>
      </CardHeader>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4 pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{displayAddress}</span>
              <button
                onClick={() => navigator.clipboard.writeText(walletAddress)}
                className="hover:text-gray-600"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
          <div className="text-4xl font-bold mb-4 flex items-center gap-4">
            <Image
              src="/images/CurrencyEth.svg"
              alt="currency"
              width={32}
              height={32}
            />
            <span>${showBalance ? balance.toFixed(2) : "*****"}</span>
            <button onClick={openBalance}>
              {showBalance ? <EyeOff size={24} /> : <EyeIcon size={24} />}
            </button>
          </div>
          <div className="flex space-x-4 mb-8">
            <WalletModals
              walletAddress={walletAddress}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
              openBalance={openBalance}
              showBalance={showBalance}
            />
          </div>
        </CardContent>
      </Card>
      <div className="">
        <Card>
          <CardContent className="py-8">
            <h3 className="lg:text-lg text-[16px] font-semibold mb-4">
              History
            </h3>
            <Table>
              <TableHeader>
                <TableRow className="text-[14px] lg:text-[16px]">
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index} className="text-[14px] lg:text-[16px]">
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
