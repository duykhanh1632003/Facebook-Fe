import React, { useState } from "react";
import CreatePostVideo from "./CreatePostVideo/CreatePostVideo";
import { useAuthContext } from "../../../context/AuthContext";
import WatchVideo from "./WatchVideo/WatchVideo";
import { useVideoPostContext } from "../../../context/VideoPostContext";

const MiddleWatch = () => {
  const [showModal, setShowModal] = useState(false);
  const { authUser } = useAuthContext();
  const { videoPosts } = useVideoPostContext();

  return (
    <div className="w-[1158px] dark:bg-[#18191A] ml-[360px] overflow-y-auto">
      <div className="w-[822px] ml-[100px] mt-3">
        <div className="h-[67px] w-full dark:bg-[#3A3B3C] bg-[#FFFFFF] flex items-center justify-start rounded-lg">
          <div className="w-[40px] h-[40px] rounded-full ml-[13px] mt-[10px]">
            <img
              className="rounded-full w-[40px] h-[40px] object-cover"
              src={authUser.user.avatar}
              alt="avatar"
            />
          </div>
          <div className="w-[509px] dark:bg-[#949799] h-[39px] bg-[#F0F2F5] rounded-3xl mt-[10px] ml-[8px] pl-[14px] cursor-pointer border-none outline-none hover:bg-[#E4E6E9]">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center mt-[9px] text-[#65676B]"
            >
              Tải video lên
            </button>
          </div>
        </div>

        <CreatePostVideo showModal={showModal} setShowModal={setShowModal} />

        {videoPosts.length > 0 ? (
          videoPosts.map((post) => <WatchVideo key={post._id} post={post} />)
        ) : (
          <p>No videos available</p>
        )}
        <div className="h-[800px]"></div>
      </div>
    </div>
  );
};

export default MiddleWatch;
