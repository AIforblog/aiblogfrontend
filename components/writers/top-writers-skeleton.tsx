import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const SkeletonTopWriterCard = () => {
  return (
    <Card className="w-full p-3 flex flex-col gap-y-[0.9rem] border rounded-xl bg-transparent shadow-none border-[#E5E5E5] dark:border-neutral-800">
      <CardHeader className="p-0 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardContent>

      <CardFooter className="p-0 flex justify-between">
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonTopWriterCard;
