"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProps } from "@/types/user";
import { CoverImage } from "./cover-image";
import { PencilLine, MoveLeft, ZoomIn, ZoomOut, Wallet } from 'lucide-react';
import ProfilePic from "./user-profile-pic";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidateTagServer } from "@/actions/common";
import makeFetch from "@/lib/helper";
import type { SuccessResponse } from "@/types/api";
import LoadingModal from "./loadingState";

interface CoverPhotoProps {
  user: UserProps;
  className?: string;
  token?: string;
  userId?: string;
}

export default function CoverPhoto({
  user,
  className,
  token,
  userId,
}: CoverPhotoProps) {
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCoverViewOpen, setIsCoverViewOpen] = useState(false);
  const [isProfileViewOpen, setIsProfileViewOpen] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
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
        setIsEditingCover(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result as string);
        setIsEditingProfile(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeCoverOverlay = () => {
    setIsEditingCover(false);
    setSelectedCoverImage(null);
    setZoomLevel(50);
    setPosition({ x: 0, y: 0 });
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
        `auth/profile/${userId}`,
        token as string,
        {
          method: "PUT",
          body: {
            coverPic: selectedCoverImage,
          },
        },
      );

      const res = await updateCoverImage();
      if (res.statusCode === 200) {
        await revalidateTagServer(`profile-${userId}`);
        toast.success("Profile updated successfully!");
        closeCoverOverlay();
      } else if (res.statusCode === 413) {
        setSelectedCoverImage(null);
        toast.error("Image should not be larger than 2MB");
      } else {
        setSelectedCoverImage(null);
        toast.error(res.message);
      }
    } catch (error: any) {
      setSelectedCoverImage(null);
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
        `auth/profile/${userId}`,
        token as string,
        {
          method: "PUT",
          body: {
            profilePic: selectedProfileImage,
          },
        },
      );

      const res = await updateProfileImage();
      if (res.statusCode === 200) {
        await revalidateTagServer(`profile-${userId}`);
        toast.success("Profile picture updated successfully!");
        closeProfileOverlay();
      } else if (res.statusCode === 413) {
        setSelectedProfileImage(null);
        toast.error("Image should not be larger than 2MB");
      } else {
        setSelectedProfileImage(null);
        toast.error(res.message);
      }
    } catch (error: any) {
      setSelectedProfileImage(null);
      console.error("Error updating profile picture:", error);
      toast.error("Error occurred:", error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <LoadingModal isOpen={isLoading} message="Image uploading..." />
      
      {/* Cover Photo Section */}
      <div className="w-full h-40 md:h-56 bg-cover bg-center rounded-2xl overflow-hidden">
        <CoverImage
          src={selectedCoverImage || user.coverPic || "/images/cover-photo.jpg"}
          alt={`${user?.username} cover pic`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="absolute top-4 right-4 rounded-full"
            >
              <PencilLine size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setIsCoverViewOpen(true)}>
              View Cover Photo
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => document.getElementById("cover-photo-upload")?.click()}>
              Edit Cover Photo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          type="file"
          id="cover-photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleCoverImageChange}
        />
      </div>

      {/* Profile Section */}
      <div className="px-4 md:px-8">
        {/* Profile Picture */}
        <div className="relative -mt-16">
          <ProfilePic
            user={user}
            selectedProfileImage={selectedProfileImage}
            handleProfileImageChange={handleProfileImageChange}
            onViewClick={() => setIsProfileViewOpen(true)}
            onEditClick={() => document.getElementById("profile-pic-upload")?.click()}
          />
          <input
            type="file"
            id="profile-pic-upload"
            className="hidden"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </div>

        {/* Profile Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          {/* <p className="text-muted-foreground">@{user.username}</p> */}
          {/* <p className="mt-2">Front end dev working in drello</p> */}
          {/* <p className="text-sm text-muted-foreground mt-1">Joined October 2024</p> */}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-sm">
              {/* <span className="font-semibold">0</span>{" "} */}
              {/* <span className="text-muted-foreground">Following</span> */}
            </p>
            <p className="text-sm">
              {/* <span className="font-semibold">0</span>{" "} */}
              {/* <span className="text-muted-foreground">Followers</span> */}
            </p>
          </div>
          <div className="mt-6">
            {/* <Button variant="outline" className="gap-2">
              <Wallet size={16} />
              View wallet
            </Button> */}
          </div>
        </div>
      </div>

      {/* Cover Photo Edit Dialog */}
      <Dialog open={isEditingCover} onOpenChange={setIsEditingCover}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MoveLeft className="cursor-pointer" onClick={closeCoverOverlay} />
              Edit Cover Photo
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
              src={selectedCoverImage || user.coverPic || "/images/cover-photo.jpg"}
              alt="Selected Cover"
              layout="fill"
              objectFit="cover"
              style={{
                transform: `scale(${1 + zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
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
          <div className="text-sm mt-2 text-center">Zoom Level: {zoomLevel}%</div>
          <DialogClose asChild>
            <Button onClick={handleCoverApply}>Apply</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Profile Picture Edit Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MoveLeft className="cursor-pointer" onClick={closeProfileOverlay} />
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
            <Image
              src={selectedProfileImage || user.profilePic || "/images/blank-profile-picture.png"}
              alt="Selected Profile Picture"
              layout="fill"
              objectFit="cover"
              style={{
                transform: `scale(${1 + zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
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
          <div className="text-sm mt-2 text-center">Zoom Level: {zoomLevel}%</div>
          <DialogClose asChild>
            <Button onClick={handleProfileApply}>Apply</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Cover View Dialog */}
      <Dialog open={isCoverViewOpen} onOpenChange={setIsCoverViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>View Cover Photo</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={selectedCoverImage || user.coverPic || "/images/cover-photo.jpg"}
              alt="Cover Photo"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile View Dialog */}
      <Dialog open={isProfileViewOpen} onOpenChange={setIsProfileViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={selectedProfileImage || user.profilePic || "/images/blank-profile-picture.png"}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

