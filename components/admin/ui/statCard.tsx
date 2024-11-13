import React from 'react';

type StatCardProps = {
  icon?: React.ReactNode;
  value: number | string;
  percentageChange: string;
  label: string;
  changeColor?: string; 
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, percentageChange, label, changeColor = 'text-green-500' }) => {
  return (
    <div className="space-y-2 bg-[#d4d4d4] px-2 pt-3 flex flex-col items-start rounded-lg">
      <div className="flex items-start relative gap-2 w-full justify-between">
        <div className="text-sm text-muted-foreground">{label}</div>
        {icon && (
          <div className="w-[40px] aspect-square bg-white rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <span className="text-lg relative -top-4 font-semibold">{value}</span>
      <div className={`text-sm ${changeColor} relative -top-4`}>{percentageChange}</div>
    </div>
  );
};
export default StatCard;
