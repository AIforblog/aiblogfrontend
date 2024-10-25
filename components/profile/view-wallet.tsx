
"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { WalletMinimal } from 'lucide-react';


function ViewWallet() {
    const ShowWallet = async () => {
        console.log("Wallet is showing");
      };
  return (
    <>
          <Button
          onClick={ShowWallet} 
          className="bg-[#171717] hover:bg-[#404040] text-[#FAFAFA] font-medium rounded-full transition duration-300 ease-in-out"
        >
        <WalletMinimal
         className='pr-2'/> View Wallet
        </Button>
    </>
  )
}

export default ViewWallet
