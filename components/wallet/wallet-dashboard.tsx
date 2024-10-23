"use client";

import { useState } from "react";
import { Copy, EyeIcon, EyeOff } from "lucide-react";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WalletModals from "./wallet-modal";

export default function WalletDashboard() {
  const [balance, setBalance] = useState(7610.0);
  const [transactions, setTransactions] = useState([
    { type: "reward", date: "12/08/24", amount: "+340 ETH" },
    { type: "withdrawal", date: "12/08/24", amount: "+340 ETH" },
    { type: "job", date: "12/08/24", amount: "+340 ETH" },
    { type: "reward", date: "12/08/24", amount: "+340 ETH" },
    { type: "withdrawal", date: "12/08/24", amount: "+340 ETH" },
  ]);

  const walletAddress = "0x27D9a...6BD04";

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
  
  const [showBalance , setShowBalance] = useState<boolean>(false)

  const openBalance = () => {
    setShowBalance(!showBalance)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{walletAddress}</span>
              <button onClick={() => navigator.clipboard.writeText(walletAddress)}><Copy className="w-4 h-4 text-gray-400" /></button>
            </div>
          </div>
          <div className="text-4xl font-bold mb-4 flex items-center gap-4">
            <Image
              src="/images/CurrencyEth.svg"
              alt="currency"
              width={32}
              height={32}
            />
            <span>$ {showBalance ? balance.toFixed(2): "*****"}</span>
            <button onClick={openBalance}>{showBalance ? <EyeOff size={24} />: <EyeIcon size={24}/>}</button>
          </div>
          <div className="flex space-x-4 mb-8">
            <WalletModals
              walletAddress={walletAddress}
              balance={balance}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
              openBalance={openBalance}
              showBalance={showBalance}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-8">
          <h3 className="lg:text-lg text-[16px] font-semibold mb-4">History</h3>
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
  );
}
