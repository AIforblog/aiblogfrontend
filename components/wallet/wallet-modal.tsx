import { useState } from "react"
import { ArrowDown, ArrowUp, Copy, EyeIcon, EyeOff } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Button from "../shared/button"

type ModalType = "deposit" | "withdraw"

interface WalletModalsProps {
  walletAddress: string
  balance: number
  onDeposit: (amount: number) => void
  onWithdraw: (amount: number) => void
  openBalance: () => void 
  showBalance:boolean
}

export default function WalletModals({
  walletAddress,
  balance = 0,
  onDeposit,
  onWithdraw,
  openBalance,
  showBalance
}: WalletModalsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>("deposit")
  const [amount, setAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setAmount("")
      setRecipientAddress("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount")
      return
    }
    if (modalType === "deposit") {
      onDeposit(numAmount)
    } else {
      if (numAmount > balance) {
        alert("Insufficient funds")
        return
      }
      onWithdraw(numAmount)
    }
    setIsOpen(false)
  }

  const setPercentage = (percentage: number) => {
    setAmount(((balance ?? 0) * percentage).toFixed(2))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="flex  gap-2">
        <DialogTrigger asChild>
          <Button
            onClick={() => setModalType("deposit")}
            className="flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
            color="secondary"
          >
            <ArrowUp />
            Deposit
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setModalType("withdraw")}
            className="flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
          >
            <ArrowDown />
            Withdraw
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px] w-[95vw] py-8 sm:py-16 min-h-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <Image
                  src="/metamask.svg"
                  alt="currency"
                  width={40}
                  height={35}
                />
                <span className="text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                  {walletAddress}
                </span>
              </div>
              <Copy className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 rounded-lg px-4 py-2 border border-gray-400 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/CurrencyEth.svg"
                  alt="currency"
                  width={24}
                  height={24}
                />
                <span className="opacity-70 text-sm sm:text-base hidden md:block">Ethereum</span>
              </div>
              <span className="text-sm sm:text-base">${showBalance ? balance.toFixed(2): "*****"}</span>
              <button onClick={openBalance}>{showBalance ? <EyeOff size={16} />: <EyeIcon size={16}/>}</button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={modalType}
          className="w-full"
          onValueChange={(value) => setModalType(value as ModalType)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="deposit"
              className="flex items-center justify-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowUp className="w-4 h-4" />
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="flex items-center justify-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowDown className="w-4 h-4" />
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center py-4">
                <Image
                  src="/images/wallet.svg"
                  width={46}
                  height={52}
                  alt="Transfer funds"
                  className="mx-auto mb-2"
                />
                <p className="text-sm sm:text-base">Transfer Funds into your wallet address</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" color="secondary" className="rounded-lg w-full sm:w-auto">
                  Fund
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="withdraw">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="from" className="text-sm">Send from</Label>
                <Input id="from" value={walletAddress} readOnly className="text-sm" />
              </div>
              <div>
                <Label htmlFor="to" className="text-sm">Send to</Label>
                <Input
                  id="to"
                  placeholder="Enter the wallet address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm">Amount</Label>
                <Label htmlFor="amount" className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <span className="text-sm">% amount to withdraw</span>
                  <div className="flex justify-between gap-2">
                    <button
                      className="px-2 sm:px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40 text-xs sm:text-sm"
                      onClick={() => setPercentage(0.2)}
                      type="button"
                    >
                      20%
                    </button>
                    <button
                      type="button"
                      className="px-2 sm:px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40 text-xs sm:text-sm"
                      onClick={() => setPercentage(0.5)}
                    >
                      50%
                    </button>
                    <button
                      className="px-2 sm:px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40 text-xs sm:text-sm"
                      type="button"
                      onClick={() => setPercentage(1)}
                    >
                      Max
                    </button>
                  </div>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm"
                />
              </div>
              
              <Button type="submit" color="secondary" className="w-full flex items-center gap-2 justify-center">
                <ArrowDown className="w-4 h-4" /> Withdraw
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}