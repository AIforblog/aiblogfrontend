import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import { cn } from "@/lib/utils";
import { SuccessResponse } from "@/types/api";
import { UserProps } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CSSProperties } from "react";

const getUserProfile = async (accessToken: string, profileId: string) => {
  try {
    const fetchUserProfile = makeFetch<SuccessResponse<UserProps>>(
      "general",
      `/auth/profile/${profileId}`,
      accessToken,
      {
        next: {
          tags: [`profile-${profileId}`],
        },
      }
    );

    return await fetchUserProfile();
  } catch (err) {
    console.error(err);
  }
};

const General = async () => {
  const user = await assertUserAuthenticated();
  const userData = await getUserProfile(user.accessToken.value, user.user.profileId);

  if (!userData) {
    return notFound();
  }

  const { firstName, lastName, profilePic, coverPic } = userData.data;

  return (
    <div className="space-y-8">
      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow: "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold leading-[1.375]">Account</h2>
        </div>

        <div className="space-y-4">
          {/* cover image */}
          <div className="relative w-full aspect-[5.35] rounded-[16px] bg-neutral-100 overflow-hidden">
            {coverPic && <Image src={coverPic} alt="User cover photo" fill />}
          </div>
          <div className="flex gap-2 items-center px-2 py-1">
            <div className="w-[60px] h-[60px] relative rounded-full bg-neutral-100 overflow-hidden">
              {profilePic && <Image src={profilePic} alt="User profile photo" fill />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold">Profile</p>
              <p className="text-xs">{firstName ? `${firstName} ${lastName}` : "No name"}</p>
            </div>

            <Link
              href="/profile"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full text-xs ml-auto border-black h-auto"
              )}
            >
              Edit
            </Link>
          </div>

          <div className="flex items-center px-2 py-1">
            <div className="space-y-1">
              <p className="font-medium">Email</p>
              <p className="text-neutral-500">{user.user.email}</p>
            </div>

            <Button
              variant={"outline"}
              className="rounded-full text-xs ml-auto border-black h-auto"
            >
              Edit
            </Button>
          </div>

          <div className="flex items-center px-2 py-1">
            <div className="space-y-1">
              <p className="font-medium">Username</p>
              <p className="text-neutral-500">@{user.user.username}</p>
            </div>

            <Button
              variant={"outline"}
              className="rounded-full text-xs ml-auto border-black h-auto"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow: "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold leading-[1.375]">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="font-bold">Notification Delivery</p>
              <p className="text-sm">How Would Like to receive notification for your Post?</p>
            </div>

            <RadioGroup className="space-y-1" defaultValue="both">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="both"
                  id="both"
                  style={{ "--primary": "150 81% 77%" } as CSSProperties}
                />
                <Label htmlFor="both">In email and app</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="email"
                  id="email"
                  style={{ "--primary": "150 81% 77%" } as CSSProperties}
                />
                <Label htmlFor="email">Only in email</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">Likes</p>
              <p className="text-sm">Notify me when someone likes my Post or Comments</p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>

          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">Comments</p>
              <p className="text-sm">
                Notify me when someone comments on or replies comment on post
              </p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>

          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">New Followers</p>
              <p className="text-sm">Notify me when I have new followers</p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>

          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">Job Completed</p>
              <p className="text-sm">Notify me when Job is completed</p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">Shared Post</p>
              <p className="text-sm">Notify me when someone shares my post</p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>

          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold leading-[1.6]">Marketing</p>
              <p className="text-sm">
                Send me information about new features and updates to Drello
              </p>
            </div>

            <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-[16px] p-5 space-y-6"
        style={{
          boxShadow: "2px -2px 16px -1px #1018280F, -2px 2px 12px -2px #1018280F",
        }}
      >
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold leading-[1.375]">Theme Mode</h2>
        </div>

        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-xl font-semibold leading-[1.6]">Light and Dark mode</p>
            <p className="text-sm"> Light mode is default Toggle to change to dark mode</p>
          </div>

          <Switch className="ml-auto" style={{ "--primary": "150 81% 77%" } as CSSProperties} />
        </div>
      </div>
    </div>
  );
};

export default General;
