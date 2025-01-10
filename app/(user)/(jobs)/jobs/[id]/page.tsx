import Comments from "@/components/shared/comments";
import { fetchJobWithComments } from "@/lib/jobs";
import { notFound } from "next/navigation";
import ActionButtons from "./_components/action-buttons";
import Aside from "./_components/aside";
import JobContent from "./_components/job-content";

const JobPage = async ({ params }: { params: { id: string } }) => {
  const { data: job, error, status } = await fetchJobWithComments(params.id);
  if (status === 404) {
    notFound();
  }

  if (error) {
    return (
      <div className="p-16 text-center text-2xl font-bold">{error.message}</div>
    );
  }

  return (
    <main className="bg-white relative overflow-auto h-[calc(100dvh-72px)]">
      <div className="absolute inset-0 px-8">
        <div className="flex gap-[30px] lg:gap-[60px] pt-8 pb-4 max-w-[1180px] mx-auto max-h-full overflow-hidden">
          <div className="max-w-screen-md mx-auto w-full max-h-full overflow-y-auto custom-scroll pb-10">
            <div className="rounded-[24px] sm:border border-neutral-200">
              <div className="sm:px-8 pt-8 space-y-4">
                <JobContent job={job} />
                <ActionButtons job={job} />
              </div>

              {/* <Comments comments={job.comments} /> */}
              <Comments
                postId={""}
                initialComments={[]}
                initialCommentsCount={0}
              />
            </div>
          </div>

          <Aside />
        </div>
      </div>
    </main>
  );
};

export default JobPage;
