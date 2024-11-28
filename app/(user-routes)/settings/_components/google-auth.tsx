import { Switch } from "@/components/ui/switch";
import { CSSProperties } from "react";
import React from "react";

function GoogleAuth() {
  return (
    <div className="space-y-6 mt-6 w-full">
      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow:
            "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold leading-[1.375]">
            Google 2fa authentication
          </h2>
        </div>

        <div className=" border rounded-lg p-4">
        <div className="space-y-1">
          <div className="flex sm:items-center justify-between ">
            <p className="md:text-xl sm:text-lg text-base font-semibold leading-[1.6] text-wrap pb-2">
              Turn on two-factor authentication
            </p>

            <Switch
              className="ml-auto md:hidden block"
              style={{ "--primary": "150 81% 77%" } as CSSProperties}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col flex-shrink">
            <div className="max-w-xl">
            <p className="text-sm sm:max-w-[85%] box-border ">
              {" "}
              Enhance your security by setting up two-factor authentication, It
              adds an extra  layer of security by requiring a special code each
              time you log in
            </p>
            </div>
        

            <Switch
              className="ml-auto md:block hidden"
              style={{ "--primary": "150 81% 77%" } as CSSProperties}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuth;
