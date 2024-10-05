import { articles } from "@/data/mock/articles";
import FeaturedArticles from "./components/home/featured-articles";
import TrendingTopics from "./components/home/trending-topics";
// import RichTextEditor from "./components/RichTextEditor/RichTextEditor";

export default function Home() {
  return (
    <div className="">
      {/* <div className=' flex justify-center items-center'> */}
      {/*   <div className='p-16 bg-gray-400'>Hello there, Welcome to AI Blog!</div> */}
      {/* </div> */}
      {/* Rich text Editor here!! */}
      {/* <RichTextEditor /> */}
      <FeaturedArticles articles={articles} />
       <TrendingTopics />
    </div>
  );
}
