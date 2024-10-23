/* eslint-disable react/display-name */
import { ArticleProps } from "@/types/article";
import { memo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import ProfileCard from "../shared/user-profile-card";
import Image from "next/image";

const ArticleCard = memo<{ article: ArticleProps }>(({ article }) => {
	return (
		<Card className="w-full px-3 pt-3 pb-5 mb-6 flex flex-col gap-y-3 min-h-[345px] border rounded-xl bg-transparent shadow-none border-[#E5E5E5]">
			<CardHeader className="p-0">
				<ProfileCard user={article.user} />
			</CardHeader>
			<CardContent className="flex flex-col p-0 gap-y-3">
				<div className="relative block w-full rounded-xl overflow-hidden">
					<Image
						src={article.image}
						alt={`${article.title} article image`}
						width={1000}
						height={1000}
						objectFit="cover"
					/>
				</div>

				<CardDescription className="flex flex-col p-0 gap-y-3">
					{/* Title */}
					<CardTitle className="text-xl font-bold leading-7 text-[#262626] p-0">
						{article.title}
					</CardTitle>

					{/* Description */}
					<p className="text-base font-normal leading-6 text-[#737373]">
						{article.description}
					</p>
				</CardDescription>
			</CardContent>
		</Card>
	);
});

export default ArticleCard;
