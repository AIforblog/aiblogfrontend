"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import makeFetch from "@/lib/helper";
import type { SuccessResponse } from "@/types/api";
import { PhoneInput } from "../ui/phone-input";
import CountrySelect from "../ui/country-select";
import RegionSelect from "../ui/state-select";
import { revalidateTagServer } from "@/actions/common";
import Button from "@/components/shared/button";

interface UserProps {
	name?: string;
	firstName?: string;
	lastName?: string;
	bio?: string;
	country?: string;
	state?: string;
	phoneNumber?: string;
	username?: string;
	externalLink?: string;
	profilePic?: string;
	coverPhoto?: string;
}

interface EditProfileProps {
	userData?: UserProps;
	token: string;
	userId: string;
}

const formSchema = z.object({
	username: z.string().min(2, "Username must be at least 2 characters."),
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	bio: z.string().optional(),
	externalLink: z
		.string()
		.url("Must be a valid URL.")
		.optional()
		.or(z.literal("")),
	country: z.string().optional(),
	state: z.string().optional(),
	phoneNumber: z.string().optional(),
});

function EditProfile({
	userData = {} as UserProps,
	token,
	userId,
}: EditProfileProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	console.log(userData)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: userData.username || "",
			firstName: userData.firstName || "",
			lastName: userData.lastName || "",
			bio: userData.bio || "",
			externalLink: userData.externalLink || "",
			country: userData.country || "",
			state: userData.state || "",
			phoneNumber: userData.phoneNumber || "",
		},
	});

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		setLoading(true);

		try {
			const updateUserProfile = makeFetch<SuccessResponse<Partial<UserProps>>>(
				"general",
				`/auth/profile/${userId}`,
				token,
				{
					method: "PUT",
					body: {
						username: values.username,
						firstName: values.firstName,
						lastName: values.lastName,
						bio: values.bio,
						country: values.country,
						state: values.state,
						phoneNumber: values.phoneNumber,
						externalLink: values.externalLink,
					},
				},
			);

			const res = await updateUserProfile();
			console.log(res, "response");
			if (res.statusCode === 200) {
				await revalidateTagServer(`profile-${userId}`);
				toggleModal();
				toast.success("Profile updated successfully!");
			} else {
				toast.error(res?.message);
			}
		} catch (error) {
			console.error(error);
			console.error("Error updating profile:", error);
			toast.error("An error occurred while updating the profile.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			
			<DialogTrigger asChild>
				
				<Button variant={"outline"} className="rounded-full hover:bg-transparent hover:text-black">
					<Pencil className="mr-2  hidden md:block" /> Edit Profile
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-1 md:flex-row md:gap-3">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="space-y-1">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea {...field} className="resize-none" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="externalLink"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>External Link</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Country</FormLabel>
										<FormControl>
											<CountrySelect {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>State</FormLabel>
										<FormControl>
											<RegionSelect
												{...field}
												countryCode={form.getValues("country") as string}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <CountryDropdown /> */}
							{/* <StateDropdown /> */}
						</div>
						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<PhoneInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Updating..." : "Update Profile"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProfile;
