import React from "react";
import { deviceSessions } from "@/data/mock/session";
import Button from "@/components/shared/button";

function ConnectedDevice() {
  return (
    <div className="mt-6 space-y-6 w-full">
      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow:
            "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold leading-[1.375]">
            Connected Device
          </h2>
        </div>
        <div className="border rounded-lg p-4">
          <div className="max-w-xl">
            <p className="text-sm">
              The locations listed below are estimates of where the IP address
              may be located within your country, region, and city. The accuracy
              of the look-up varies by providers and the location of the device.
              This should only be used as a rough guideline.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {deviceSessions.map((session, index) => (
            <div
              key={index}
              className="border-b p-4 flex flex-col sm:flex-row sm:justify-between items-start"
            >
              <div>
                <p className="font-bold text-base">{session.session}</p>
                <p className="text-sm text-gray-600">{session.device}</p>
                <p className="text-sm text-gray-600">{session.location}</p>
                <p className="text-sm text-gray-500">{session.time}</p>
              </div>
              <Button
                variant={"outline"}
                className="rounded-full text-xs border-black h-auto w-fit mt-4 sm:mt-0 sm:self-start"
              >
                Logout
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full sm:w-auto bg-[#fdc316] text-xs hover:bg-[hsl(45,98%,49%)] text-black rounded-full h-auto sm:ml-auto">
          Log out of all devices
        </Button>
      </div>
    </div>
  );
}

export default ConnectedDevice;
