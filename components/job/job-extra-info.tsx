/* eslint-disable react/display-name */

"use client";

import { memo } from "react";

interface JobExtraInfoItemProps {
  title: string;
  count?: number;
  onClick: () => void;
}

interface JobExtraInfoProps {
  repliesCount: number;
  customOption: "Custom" | "Advanced";
  normalStrings: string[];
}

// const JobExtraInfoItem = ({ title, count, onClick }: JobExtraInfoItemProps) => {
//   return (
//     <div className="flex items-center">
//       {title === "Replies" ? (
//         <div
//           className="flex items-center justify-center gap-x-1.5 bg-[#FCF4AA] px-2 py-[5px] rounded-full hover:bg-[#f4ea8e]  transition duration-300 ease-in-out cursor-pointer"
//           onClick={onClick} //Click event for each item
//         >
//           <h3 className="text-xs font-medium capitalize text-center text-[#171717]">
//             {title}
//           </h3>

//           {count && (
//             <span className="text-xs font-medium bg-white text-[#525252] p-1.5 min-w-5 h-5 text-center flex items-center justify-center rounded-full">
//               {count}
//             </span>
//           )}
//         </div>
//       ) : <div
//           className="flex items-center justify-center gap-x-1.5 border-[#E5E5E5] bg-[#eeeeee] hover:bg-[#E8E8E880] px-2 py-[5px] rounded-full transition duration-300 ease-in-out cursor-pointer"
//           onClick={onClick} //Click event for each item
//         >
//           <h3 className="text-xs font-normal capitalize text-center text-[#171717]">
//             {title}
//           </h3>
//         </div> ? (
//         title === "Custom" ||
//         (title === "Advanced" && (
//           <div
//             className="flex items-center justify-center gap-x-1.5 border-[#E5E5E5] bg-[#eeeeee] hover:bg-[#E8E8E880] px-2 py-[5px] rounded-full transition duration-300 ease-in-out cursor-pointer"
//             onClick={onClick} //Click event for each item
//           >
//             <h3 className="text-xs font-normal capitalize text-center text-[#171717]">
//               Custom
//               {title}
//             </h3>
//           </div>
//         ))
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

//   {
//     /* {count !== undefined && (
//     <span className="bg-yellow-200 rounded-full p-1.5  text-sm font-semibold">
//       {count}
//     </span>
//   )} */
//   }
//   <h3 className="text-xs font-medium capitalize text-center text-[#171717]">
//     {title}
//   </h3>;

const JobExtraInfoItem = ({ title, count, onClick }: JobExtraInfoItemProps) => {
  let content;

  if (title === "Replies") {
    content = (
      <div
        className="flex items-center justify-center gap-x-1.5 bg-[#FCF4AA] px-2 py-[5px] rounded-full hover:bg-[#f4ea8e]  transition duration-300 ease-in-out cursor-pointer"
        onClick={onClick} //Click event
      >
        <h3 className="text-xs font-normal capitalize text-center text-[#171717]">
          {title}
        </h3>

        {count && (
          <span className="text-xs font-normal bg-white text-[#525252] p-1.5 min-w-5 h-5 text-center flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </div>
    );
  } else if (title === "Custom" || title === "Advanced") {
    content = (
      <div
        className="flex items-center justify-center gap-x-1.5 border-[#E5E5E5] bg-[#eeeeee] hover:bg-[#E8E8E880] px-2 py-[5px] rounded-full transition duration-300 ease-in-out cursor-pointer"
        onClick={onClick} //Click event
      >
        {title === "Custom" && (
          <span className="text-xs font-normal bg-[#0984E3] w-2 h-2 rounded-full" />
        )}
        <h3 className="text-xs font-normal capitalize text-center text-[#171717]">
          {title}
        </h3>
      </div>
    );
  } else {
    content = (
      <div
        className="flex items-center justify-center gap-x-1.5 border-[#E5E5E5] bg-[#eeeeee] hover:bg-[#E8E8E880] px-2 py-[5px] rounded-full transition duration-300 ease-in-out cursor-pointer"
        onClick={onClick} //Click event
      >
        <h3 className="text-xs font-medium capitalize text-center text-[#171717]">
          {title}
        </h3>
      </div>
    );
  }

  return <div className="flex items-center">{content}</div>;
};

const JobExtraInfo = memo<JobExtraInfoProps>(
  ({ repliesCount, customOption, normalStrings }) => {
    const handleClick = (item: string) => {
      console.log(item); // Handle the click event for each item
    };

    return (
      <div className="flex gap-2">
        <JobExtraInfoItem
          title="Replies"
          count={repliesCount}
          onClick={() => handleClick("Replies")}
        />
        {normalStrings.map((item, index) => (
          <JobExtraInfoItem
            key={index}
            title={item}
            onClick={() => handleClick(item)}
          />
        ))}
        <JobExtraInfoItem
          title={customOption}
          onClick={() => handleClick(customOption)}
        />
      </div>
    );
  }
);

export default JobExtraInfo;
