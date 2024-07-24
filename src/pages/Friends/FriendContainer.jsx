// FriendContainer.js
import FriendCanKnow from "./FriendCanKnow";
import FriendRequest from "./FriendRequest";

const FriendContainer = () => {
  return (
    <div className="bg-[#EDEFF2] dark:bg-[#1A1A1A] w-full">
      <div className="flex justify-between pt-[36px] pr-[36px] pl-[36px]">
        <div className="text-2xl font-bold dark:text-white">
          Lời mời kết bạn
        </div>
        <div className="text-[#396cc9] dark:text-[#7BA9FF]">Xem tất cả</div>
      </div>
      <div className="overflow-y-auto">
        <FriendRequest />
      </div>
      <div className="w-full h-[0.5px] ml-5 mr-5 bg-[#5a5858] mt-4 dark:bg-[#3A3B3C]"></div>
      <div className="flex justify-between pt-[36px] pr-[36px] pl-[36px]">
        <div className="text-2xl font-bold dark:text-white">
          Những người bạn mà bạn có thể biết
        </div>
        <div className="text-[#396cc9] dark:text-[#7BA9FF]">Xem tất cả</div>
      </div>
      <div className="overflow-y-auto">
        <FriendCanKnow />
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default FriendContainer;
