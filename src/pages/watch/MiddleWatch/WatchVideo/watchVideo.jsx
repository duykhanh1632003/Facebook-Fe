import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Video from "../../Video";

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
    <div className="w-full bg-white mt-2">
      <div key={post._id} className="mb-4">
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
          <div>
            <BsThreeDots />
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
        <div className="w-full max-h-[437px]">
          <Video videoUrl={post.videoUrl} videoId={post._id} />
        </div>
        <div className="mt-3 h-[100px] w-full">{post.view} lượt xem</div>
      </div>
    </div>
  );
};

export default WatchVideo;
