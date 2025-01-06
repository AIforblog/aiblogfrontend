"use client";
import type { z } from "zod";
import PostEditor from "./editor";
import { PostConfig } from "./post-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createBlogSchema } from "@/schemas/blog";
import { postBlogAction } from "@/actions/blog";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type FormValues = z.infer<typeof createBlogSchema>;

const CreatePost = () => {
  const { execute, isPending } = useServerAction(postBlogAction);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "Test Title",
      content: "Just testing the content",
      tags: "Hello Hi Sup",
      category: "Football",
      status: "published",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    if (values.coverImage) {
      formData.append("file", values.coverImage);
    }
    const [data, err] = await execute({
      fileWrapper: formData,
      status: "published",
      category: values.category,
      tags: values.tags,
      content: values.content,
      title: values.title,
    });

    console.log({ data });
    if (data?.statusCode === 201) {
      toast.success("Post Created Successfully");
      router.push("/");
    }

    if (err) {
      console.error(err);
    }

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] mt-8 gap-5">
          <PostEditor form={form} />
          <PostConfig
            isPending={isPending}
            form={form}
            onPublish={form.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreatePost;
