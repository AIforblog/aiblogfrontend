import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center  w-full h-3">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`flex-1 h-full rounded-full ${
            index === currentStep - 1 ? "bg-[#FDC316]" : "bg-[#E5E5E5]"
          } ${index !== totalSteps - 1 ? "mr-2" : ""}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
