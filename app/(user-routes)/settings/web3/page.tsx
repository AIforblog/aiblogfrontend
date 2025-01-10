import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  const wallets = [
    { address: "0x27D***************", status: "Wallet not Connected" },
    { address: "0x27D***************", status: "Wallet not Connected" },
    { address: "0x25v***************", status: "Wallet not Connected" },
  ];

  return (
    <div className="w-full gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="border-b pb-4 md:text-[24px] md:leading-[34px]">
              Wallet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Not Connected</p>
              <Button className="rounded-full border border-black bg-transparent hover:bg-transparent  text-black">
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="border-b pb-4 md:text-[24px] md:leading-[34px]">
              Wallet Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg  p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{wallet.address}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <div className="h-2 w-2 rounded-full bg-destructive" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {wallet.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
