"use client";
import { Link } from "react-router-dom";
import { FaUserFriends, FaWarehouse } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { IoMdBookmark } from "react-icons/io";
import { BiSolidChevronDown } from "react-icons/bi";
import { useAuthContext } from "../../../context/AuthContext";
import { MdShoppingCart } from "react-icons/md";
import { useTranslation } from "react-i18next";

const LeftSideBar = () => {
  const { authUser } = useAuthContext();
  const { t } = useTranslation();

  return (
    <div className="dark:bg-[#18191A] dark:text-white w-[348px] mt-16 custom-scrollbar fixed pt-[14px] bg-[#F0F2F5] mr-[112px] overflow-auto flex flex-col h-screen">
      <div className="flex fixed w-[348px] dark:text-white h-[48px] items-center dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg cursor-pointer">
        <div className="w-[36px] h-[36px] rounded-full bg-slate-800 flex items-center justify-center ml-[16px] mr-[12px]">
          <img
            className="rounded-full w-full h-full object-cover"
            src={authUser.user.avatar}
            alt="avatar"
          />
        </div>
        <Link
          to={`/profile/${authUser.user._id}`}
          className="flex items-center justify-center font-medium mb-9 pt-4"
        >
          {authUser.user.firstName} {authUser.user.lastName}
        </Link>
      </div>
      <Link
        to={"/friends"}
        className="flex mt-12 h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <FaUserFriends className="w-[36px] h-[36px] rounded-full text-blue-400 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.Friend")}
        </div>
      </Link>
      <Link
        to={"/shop"}
        className="flex h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <MdShoppingCart className="w-[36px] h-[36px] rounded-full text-blue-400 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.Shop")}
        </div>
      </Link>
      <Link
        to={"/market"}
        className="flex h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <FaWarehouse className="w-[36px] h-[36px] rounded-full text-green-300 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.MarketPlace")}
        </div>
      </Link>
      <Link
        to={"/group"}
        className="flex h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <RiGroupLine className="w-[36px] h-[36px] rounded-full text-emerald-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.Group")}
        </div>
      </Link>
      <Link
        to={"/memory"}
        className="flex h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <PiClockCounterClockwiseBold className="w-[36px] h-[36px] rounded-full text-emerald-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.Memory")}
        </div>
      </Link>
      <Link
        to={"/bookmark"}
        className="flex h-[48px] dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-90"
      >
        <IoMdBookmark className="w-[36px] h-[36px] rounded-full text-purple-700 flex items-center justify-center ml-[16px] mr-[12px]" />
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.Bookmark")}
        </div>
      </Link>
      <div className="flex h-[48px] items-center dark:hover:bg-[#3A3B3C] hover:bg-gray-200 hover:rounded-tl-lg hover:rounded-bl-lg cursor-pointer">
        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center ml-[16px] mr-[12px] bg-gray-200 dark:bg-[#3A3B3C]">
          <BiSolidChevronDown className="text-2xl " />
        </div>
        <div className="flex items-center justify-center font-medium">
          {t("HomePage.leftSideBar.WatchMore")}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
