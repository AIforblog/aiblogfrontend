import { BlogCard } from "@/components/blog";
import { BlogDummyData } from "@/data/mock/blog";
import React from "react";

const Home = () => {
	return (
		<div className="containerHeight overflow-scroll custom-scroll pb-6">
			{BlogDummyData.map((item) => (
				<React.Fragment key={item.id}>
					<BlogCard blog={item} />
					<div className="h-[1px] mb-6 w-full bg-[#E5E5E5]" />
				</React.Fragment>
			))}
		</div>
	);
};

export default Home;
