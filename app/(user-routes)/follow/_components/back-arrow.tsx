"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackArrow() {
	const router = useRouter();
	return (
		<ArrowLeft
			size={24.67}
			onClick={() => {
				router.back();
			}}
		/>
	);
}
