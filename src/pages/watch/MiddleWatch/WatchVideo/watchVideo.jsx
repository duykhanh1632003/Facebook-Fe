import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Video from "../../Video";
import CommentLikeShareVideo from "./CommentLikeShareVideo/CommentLikeShareVideo";

const WatchVideo = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const contentToShow =
    isExpanded || post.content.split(" ").length <= 10
      ? post.content
      : post.content.split(" ").slice(0, 10).join(" ") + "...";

  return (
    <div className="w-full bg-white  mt-2 rounded-lg">
      <div key={post._id} className="mb-4 dark:bg-[#3A3B3C]">
        <div className="flex justify-between">
          <div className="flex items-center px-2 py-2">
            <div className="w-[49px] h-[49px] rounded-full">
              <img
                className="w-[49px] h-[49px] rounded-full object-cover"
                src={post.author.avatar}
                alt="avt"
              />
            </div>
            <div className="ml-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {`${post.author.firstName} ${post.author.lastName}`}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center px-2 py-2">
            <BsThreeDots className="text-zinc-900 dark:text-zinc-100" />
          </div>
        </div>
        <div className="px-2 font-bold">
          <p className="text-sm text-zinc-900 dark:text-zinc-100">
            {contentToShow}
          </p>
          {post.content.split(" ").length > 10 && (
            <a
              href="#"
              onClick={toggleExpanded}
              className="text-blue-500 dark:text-blue-400"
            >
              {isExpanded ? "Ẩn bớt" : "Xem thêm"}
            </a>
          )}
        </div>
        <div className="w-full">
          <Video videoUrl={post.videoUrl} videoId={post._id} />
        </div>

        <div className="flex w-[823px]">
          <CommentLikeShareVideo
            postId={post._id}
            likes={[]}
            comments={[]}
            share={[]}
            view={post.view}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
