"use client";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { IoMdBookmark } from "react-icons/io";
import { BiSolidChevronDown } from "react-icons/bi";
import { useAuthContext } from "../../../context/AuthContext";

const LeftSideBar = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="w-[348px] custom-scrollbar fixed pt-[14px] bg-[#F0F2F5] mr-[112px] overflow-auto flex flex-col h-screen">
      <div className="flex fixed h-[48px]  items-center hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg cursor-pointer">
        <div className="w-[36px] h-[36px] rounded-full bg-slate-800 flex items-center justify-center ml-[16px] mr-[12px]">
          <img
            className="rounded-full w-full h-full object-cover"
            src={authUser.user.avatar}
            alt="avatar"
          />
        </div>
        <Link
          to={`/profile/${authUser.user._id}`}
          className="flex items-center justify-center font-medium"
        >
          {authUser.user.firstName} {authUser.user.lastName}
        </Link>
      </div>
      <Link
        to={"/friend"}
        className="flex h-[48px]   hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <FaUserFriends className="w-[36px] h-[36px] rounded-full text-blue-400 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          Bạn Bè
        </div>
      </Link>
      <Link
        to={"/market"}
        className="flex h-[48px]   hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <FaWarehouse className="w-[36px] h-[36px] rounded-full text-green-300 flex items-center justify-center ml-[16px] mr-[12px]" />

        <div className="flex items-center justify-center font-medium">
          Marketplace
        </div>
      </Link>
      <Link
        to={"/group"}
        className="flex h-[48px]  hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <RiGroupLine className="w-[36px] h-[36px] rounded-full text-emerald-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">Nhóm</div>
      </Link>
      <Link
        to={"/memory"}
        className="flex h-[48px]   hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <PiClockCounterClockwiseBold className="w-[36px] h-[36px] rounded-full text-emerald-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          Kỷ niệm
        </div>
      </Link>
      <Link
        to={"/bookmark"}
        className="flex h-[48px]   hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <IoMdBookmark className="w-[36px] h-[36px] rounded-full text-purple-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          Bookmark
        </div>
      </Link>
      <div className="flex h-[48px]  items-center hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg cursor-pointer">
        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center ml-[16px] mr-[12px]  bg-gray-200">
          <BiSolidChevronDown className="text-2xl " />
        </div>
        <div className="flex items-center justify-center font-medium">
          Xem thêm
        </div>
      </div>
      {/* <ImageUpload /> */}
    </div>
  );
};

export default LeftSideBar;
