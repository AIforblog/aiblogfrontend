import { JobCard } from "@/components/job";
import { JobsHeader } from "@/components/job/jobs-header";
import { fetchJobs } from "@/lib/jobs";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface JobsProps {
  searchParams: { page?: string };
}
const Jobs = async ({ searchParams }: JobsProps) => {
  const { data, error } = await fetchJobs({
    page: Number(searchParams.page || 1),
  });

  if (error) {
    return <p>{error.message}</p>;
  }
  const { prev, next, page, results } = data;

  return (
    <div className="h-screen md:containerHeight overflow-scroll custom-scroll pb-32 md:pb-40">
      <JobsHeader />
      <div>
        {results.map((item, index) => (
          <JobCard key={index} job={item} />
        ))}
      </div>
      <div className="py-4 flex justify-center gap-4 items-center">
        <Link
          href={`?page=${page - 1}`}
          aria-disabled={!prev}
          aria-label="Previous page"
          className={cn(
            "p-1.5 bg-cta-primary-normal hover:bg-cta-primary-normal/80 rounded-full",
            !prev &&
              "bg-cta-primary-normal/30 hover:bg-cta-primary-normal/30 cursor-not-allowed",
          )}
        >
          <ChevronLeftIcon size={20} />
        </Link>

        <p className="font-semibold">{page}</p>

        <Link
          aria-disabled={!next}
          href={`?page=${page + 1}`}
          aria-label="Next page"
          className={cn(
            "p-1.5 bg-cta-primary-normal hover:bg-cta-primary-normal/80 rounded-full",
            !next &&
              "bg-cta-primary-normal/30 hover:bg-cta-primary-normal/30 cursor-not-allowed",
          )}
        >
          <ChevronRightIcon size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Jobs;
