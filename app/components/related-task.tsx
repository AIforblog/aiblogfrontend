import { APIJobType } from "@/types/job";
import Link from "next/link";

interface TaskProps {
  job: APIJobType;
}

const padNumber = (number: number, padLength = 2, fillString = "0") => {
  return number.toString().padStart(padLength, fillString);
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const RelatedTask = ({ job }: TaskProps) => {
  const taskDate = new Date(job.startDate);
  const dateString = `${MONTHS[taskDate.getMonth()]} ${padNumber(
    taskDate.getDate(),
  )}, ${taskDate.getFullYear()}`;
  const timeString = `${DAYS[taskDate.getDay()]}, ${padNumber(taskDate.getHours())}:${padNumber(
    taskDate.getMinutes(),
  )}`;

  return (
    <div className="pb-3 border-b-[0.5px] last:border-0 border-neutral-200">
      <div className="flex items-center justify-between">
        <p className="text-neutral-400 font-bold text-sm leading-[1.2] capitalize">
          Ongoing
        </p>
        <Link
          href="#"
          className="border border-[#FDC316] p-2 text-xs text-[#FDC316] leading-[1.2] rounded-xl hover:bg-[#FDC316] hover:text-white"
        >
          View
        </Link>
      </div>
      <p className="leading-[1.6] font-medium mt-4">{job.title}</p>
      <div className="text-sm text-neutral-500 leading-[1.36] gap-1 flex items-center mt-3">
        <p>{dateString}</p>
        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
        <p>{timeString}</p>
      </div>
    </div>
  );
};

export default RelatedTask;
