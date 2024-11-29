"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectButtonTest() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ConnectButton />
      </div>
    </main>
  );
}
