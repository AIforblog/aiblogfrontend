import React from "react";

const WalletBalance = () => {
  return (
    <div>
      <div className="p-4 bg-wallet-balance">
        <div className="flex items-center justify-between">
          <div>
            <p className="md:text-sm text-[9px]  font-medium text-white">Total Balance</p>
            <p className="md:text-2xl font-bold text-white text-[12px]">$44,345.95</p>
          </div>
          <p className="md:text-sm text-[9px] text-white">
            You just received 345ETH // 12:34AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
