import React from "react";
import Image from "next/image";
const Job = () => {
  return (
    <div className="w-full bg-[#FCF4AA] items-center rounded-[12px] overflow-hidden relative">
      <Image
        src="/images/jobcta.png"
        width={218}
        height={181}
        className="absolute -top-4 -right-8"
        alt="jobcta"
      />
      <div className="pl-6 py-8 pr-4 md:pr-0 relative">
        <h1 className="font-sans text-[40px] font-bold leading-[1.3] text-[#171717]">
          Jobs
        </h1>
        <p className="font-sans text-lg font-normal leading-[20.8px] text-[#737373] mt-2  ">
          Find tasks, complete actions, and earn rewards
        </p>
      </div>
    </div>
  );
};

export default Job;
