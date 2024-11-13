"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProps } from "@/types/user";
import { CoverImage } from "./cover-image";
import { PencilLine, MoveLeft, ZoomIn, ZoomOut } from "lucide-react";
import ProfilePic from "./user-profile-pic";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { revalidateTagServer } from "@/actions/common";
import makeFetch from "@/lib/helper";
import type { SuccessResponse } from "@/types/api";
import LoadingModal from "./loadingState";

interface CoverPhotoProps {
  user: UserProps;
  className?: string;
  token?: string;
  profileId?: string;
}

export default function CoverPhoto({
  user,
  className,
  token,
  profileId,
}: CoverPhotoProps) {
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(
    null
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const dragImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(Number(e.target.value));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      setIsEditingCover(true);
    }
  };

  const closeCoverOverlay = () => {
    setIsEditingCover(false);
    setSelectedCoverImage(null);
    setZoomLevel(50);
    setPosition({ x: 0, y: 0 });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsEditingProfile(true);
    }
  };

  const closeProfileOverlay = () => {
    setIsEditingProfile(false);
    setSelectedProfileImage(null);
    setZoomLevel(50);
    setPosition({ x: 0, y: 0 });
  };

  const handleCoverApply = async () => {
    try {
      setIsLoading(true);
      const updateCoverImage = makeFetch<SuccessResponse<Partial<UserProps>>>(
        "general",
        `/auth/profile/${profileId}`,
        token as string,
        {
          method: "PUT",
          body: {
            coverPic: selectedCoverImage,
          },
        }
      );

      const res = await updateCoverImage();
      if (res.statusCode === 200) {
        await revalidateTagServer(`profile-${profileId}`);
        toast.success("Profile updated successfully!");
        closeCoverOverlay();
      } else if ((res.statusCode = 413)) {
		setSelectedCoverImage("")
        toast.error("Image should not be larger than 2MB");
      } else {
		setSelectedCoverImage("")
        toast.error(res.message);
      }
    } catch (error: any) {
		setSelectedCoverImage("");
      console.error("Error updating profile:", error);
      toast.error("Error Occurred:", error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileApply = async () => {
    try {
      setIsLoading(true);
      const updateProfileImage = makeFetch<SuccessResponse<Partial<UserProps>>>(
        "general",
        `/auth/profile/${profileId}`,
        token as string,
        {
          method: "PUT",
          body: {
            profilePic: selectedProfileImage,
          },
        }
      );

      const res = await updateProfileImage();
      if (res.statusCode === 200) {
        await revalidateTagServer(`profile-${profileId}`);
        toast.success("Profile picture updated successfully!");
        closeProfileOverlay();
      } else if ((res.statusCode = 413)) {
        setSelectedProfileImage("");
        toast.error("Image should not be larger than 2MB");
      } else {
        setSelectedProfileImage("");
        toast.error(res.message);
      }
    } catch (error: any) {
      setSelectedProfileImage("");
      console.error("Error updating profile picture:", error);
      toast.error("Error occured:", error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <LoadingModal isOpen={isLoading} message="Image uploading..." />
      <div className="w-full h-40 md:h-56 bg-cover bg-center rounded-2xl overflow-hidden">
        {user?.coverPic && (
          <CoverImage
            src={
              selectedCoverImage || user.coverPic || "/images/cover-photo.jpg"
            }
            alt={`${user?.username} cover pic`}
          />
        )}
      </div>
      <div className="absolute mb-4 top-4 right-4 flex gap-2 group">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() =>
                  document.getElementById("cover-photo-upload")?.click()
                }
                size="icon"
                className="rounded-full"
              >
                <PencilLine size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Media</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <input
          type="file"
          id="cover-photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleCoverImageChange}
        />
      </div>
      <Dialog open={isEditingCover} onOpenChange={setIsEditingCover}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MoveLeft
                className="cursor-pointer"
                onClick={closeCoverOverlay}
              />
              Edit Media
            </DialogTitle>
          </DialogHeader>
          <div
            className="relative w-full h-48 overflow-hidden bg-gray-200 flex items-center justify-center"
            onMouseDown={startDragging}
            onMouseMove={dragImage}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            <Image
              src={
                selectedCoverImage ||
                user?.coverPhoto ||
                "/images/cover-photo.jpg"
              }
              alt="Selected Cover"
              layout="fill"
              objectFit="cover"
              style={{
                transform: `scale(${1 + zoomLevel / 100}) translate(${
                  position.x
                }px, ${position.y}px)`,
              }}
              className="cursor-move"
            />
          </div>
          <div className="flex items-center gap-4 mt-4 w-full">
            <ZoomOut />
            <input
              type="range"
              min="1"
              max="100"
              value={zoomLevel}
              onChange={handleZoomChange}
              className="flex-1"
            />
            <ZoomIn />
          </div>
          <div className="text-sm mt-2 text-center">
            Zoom Level: {zoomLevel}%
          </div>
          <DialogClose asChild>
            <Button onClick={handleCoverApply}>Apply</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div className="bottom-12 left-4 flex gap-2 relative md:left-8">
        <div className="relative">
          <ProfilePic
            user={user}
            selectedProfileImage={selectedProfileImage}
            handleProfileImageChange={handleProfileImageChange}
          />
        </div>
      </div>
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MoveLeft
                className="cursor-pointer"
                onClick={closeProfileOverlay}
              />
              Edit Profile Picture
            </DialogTitle>
          </DialogHeader>
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-auto"
            onMouseDown={startDragging}
            onMouseMove={dragImage}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            {selectedProfileImage && (
              <Image
                src={selectedProfileImage || user.profilePic}
                alt="Selected Cover"
                layout="fill"
                objectFit="cover"
                style={{
                  transform: `scale(${1 + zoomLevel / 100}) translate(${
                    position.x
                  }px, ${position.y}px)`,
                }}
                className="cursor-move"
              />
            )}
          </div>
          <div className="flex items-center gap-4 mt-4 w-full">
            <ZoomOut />
            <input
              type="range"
              min="1"
              max="100"
              value={zoomLevel}
              onChange={handleZoomChange}
              className="flex-1"
            />
            <ZoomIn />
          </div>
          <div className="text-sm mt-2 text-center">
            Zoom Level: {zoomLevel}%
          </div>
          <DialogClose asChild>
            <Button onClick={handleProfileApply}>Apply</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
