import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-white relative overflow-auto h-[calc(100dvh-72px)] px-8 flex flex-col  pt-16">
      <div className="w-full sm:p-8 space-y-4 rounded-[24px] sm:border border-neutral-200 max-w-screen-lg mx-auto">
        <h1 className="text-[32px] leading-[1.2] font-bold text-center">
          Job not Found
        </h1>
        <Link
          href="/"
          className="block bg-primary w-fit text-primary-foreground hover:bg-primary/80 rounded-lg px-6 py-3 mx-auto"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
