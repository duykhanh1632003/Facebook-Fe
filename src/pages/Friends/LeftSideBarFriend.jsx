import "./LeftSideBarFriend.css"; // Đảm bảo bạn đã nhập file CSS
import { RiSettings5Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

const LeftSideBarFriend = () => {
  return (
    <div className="left-sidebar-friend w-[360px] pt-[12px] bg-[#FFFFFF] h-full">
      <div className="flex justify-between pl-[17px] pr-[17px] mb-[12px]">
        <div className="text-2xl font-bold">Bạn bè</div>
        <div className="w-[36px] h-[36px] rounded-full text-2xl bg-[#E4E6EB] flex items-center justify-center">
          <RiSettings5Fill />
        </div>
      </div>
      <div className="ml-2 mr-2 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-[#F0F2F5] flex h-[47px] cursor-pointer">
        <div className="bg-[#1877F2] w-[36px] h-[36px] rounded-full text-2xl flex items-center justify-center text-[#EBE4C9]">
          <FaUserFriends />
        </div>
        <div className="flex items-center ml-2 font-medium">Trang chủ</div>
      </div>
    </div>
  );
};

export default LeftSideBarFriend;
