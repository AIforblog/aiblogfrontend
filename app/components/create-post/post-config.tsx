import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sparkles, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import Publish from "./publish";
import TagsInput from "./tags-input";
import { saveToDraft } from "@/actions/blog";
import type { FormValues } from "./create-post";
import { useCallback, useState } from "react";
import Image from "next/image";

interface PostConfigProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
  onPublish: () => void;
}

export const PostConfig = ({ form, onPublish, isPending }: PostConfigProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        form.setValue("coverImage", file);
      }
    },
    [form],
  );

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    form.setValue("coverImage", undefined);
  }, [form]);

  return (
    <Card className="order-1 md:order-2 bg-transparent border-none md:border shadow-none md:bg-neutral-50 flex flex-col gap-3 font-dm-sans md:shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] rounded-2xl">
      <CardHeader className="px-0 md:px-6">
        <Card className="shadow-none bg-palegoldenrod rounded-xl border-transparent flex flex-col gap-0">
          <CardHeader className="pb-4">
            <Select>
              <SelectTrigger className="bg-white rounded-xl py-6">
                <SelectValue placeholder="Ai Generated Content" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="other">Other things</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pb-4">
            <Label>Paste Your Link here</Label>
            <Input
              className="rounded-xl bg-white text-neutral-400 mt-2 py-6"
              placeholder="https//Chatgpt.com/share"
            />
          </CardContent>
          <CardFooter>
            <Button className="rounded-full py-6 bg-text-color text-neutral-50">
              <Sparkles className="mr-2 h-5 w-5" /> Generate
            </Button>
          </CardFooter>
        </Card>
      </CardHeader>
      <CardContent className="px-0 md:px-6">
        <Card className="shadow-none bg-neutral-100 border-transparent rounded-xl">
          <CardHeader className="">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative h-[180px] bg-white border-neutral-100 border rounded-xl overflow-hidden">
                      {previewUrl ? (
                        <>
                          <Image
                            src={previewUrl}
                            alt="Cover preview"
                            layout="fill"
                            objectFit="cover"
                          />
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute top-2 right-2 bg-white/50 hover:bg-white/75 transition-colors z-10"
                            onClick={handleRemoveImage}
                            type="button"
                          >
                            <X size={15} />
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-xl text-neutral-200">
                          Add Cover
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer z-0 h-full w-full"
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange(e.target.files?.[0]);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Sports, Education, Web 3"
                        className="border border-neutral-200 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:items-center gap-3 px-0 md:px-6">
            <Button
              onClick={(e) => {
                e.preventDefault();
                saveToDraft();
              }}
              className="border-text-color text-neutral-700 font-medium rounded-full py-6 px-6"
              variant={"outline"}
              disabled={isPending}
            >
              Save to draft
            </Button>
            <Publish onPublish={onPublish} isPending={isPending} />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};
