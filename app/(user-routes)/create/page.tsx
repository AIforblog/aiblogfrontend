import Back from "@/app/components/create-post/back";
import CreatePost from "@/app/components/create-post/create-post";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Pencil, Ellipsis } from "lucide-react";
import Link from "next/link";

export default async function CreatePostPage() {
  return (
    <main className="max-w-[1380px] w-full mx-auto px-4 py-10 font-dm-sans">
      <div className="flex items-center justify-between">
        <Breadcrumb className="text-neutral-700 flex gap-8 items-center">
          <Back />
          <BreadcrumbList className="hidden md:flex">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Create Post</BreadcrumbPage>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-5 items-center">
          <Link href={"/create-job"}>
            <Button className="rounded-full text-text-color bg-accents-greenish py-6 gap-3 hidden md:flex ">
              <span className="p-2 bg-white rounded-full">
                <Pencil size={14} />
              </span>
              Create Job
            </Button>
          </Link>

          <Button className="hidden md:flex rounded-full text-modals-and-dropdown bg-gray hover:bg-gray hover:opacity-80 transition-opacity duration-300 py-6 gap-3">
            <Pencil size={14} />
            Drafts
          </Button>

          <div className="flex items-center gap-2 md:hidden">
            <Button size={"icon"} variant="ghost">
              <Ellipsis />
            </Button>
            <Button
              className="bg-cta-primary-normal text-text-color rounded-full"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <CreatePost />
    </main>
  );
}
