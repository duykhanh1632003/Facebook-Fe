import React from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { HiInbox } from "react-icons/hi2";
import { PiHandbagFill } from "react-icons/pi";
import { FaTag } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const LeftSideBarMarket = () => {
  const location = useLocation();

  const getLinkClass = (path) =>
    `ml-2 mr-2 pt-1 pb-1 pl-2 pr-2 rounded-lg flex h-[47px] cursor-pointer ${
      location.pathname === path
        ? "bg-[#F0F2F5] dark:bg-[#3A3B3C]"
        : "bg-white dark:bg-[#1A1A1A]"
    }`;

  const getIconClass = (path) =>
    `w-[36px] h-[36px] rounded-full text-2xl flex items-center justify-center ${
      location.pathname === path
        ? "text-[#EBE4C9] bg-[#1877F2]"
        : "text-black bg-[#D8DADF] dark:bg-[#3A3B3C]"
    }`;

  return (
    <div className="left-sidebar-friend w-[360px] pt-[12px] bg-[#FFFFFF] dark:bg-[#1A1A1A] h-full mt-2">
      <div className="flex justify-between pl-[17px] pr-[17px] mb-[12px]">
        <div className="text-2xl font-bold dark:text-white">Marketplace</div>
        <div className="w-[36px] h-[36px] rounded-full text-2xl bg-[#E4E6EB] text-black dark:bg-[#3A3B3C] flex items-center justify-center">
          <RiSettings5Fill />
        </div>
      </div>
      <Link to={"/market"} className={getLinkClass("/market")}>
        <div className={getIconClass("/market")}>
          <FaUserFriends />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          Trang chủ
        </div>
      </Link>
      <Link
        to={"/market/notifications"}
        className={getLinkClass("/market/notifications")}
      >
        <div className={getIconClass("/market/notifications")}>
          <IoIosNotifications />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          Thông báo
        </div>
      </Link>
      <Link to={"/market/inbox"} className={getLinkClass("/market/inbox")}>
        <div className={getIconClass("/market/inbox")}>
          <HiInbox />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          Hộp thư
        </div>
      </Link>
      <Link to={"/market/you"} className={getLinkClass("/market/you")}>
        <div className={getIconClass("/market/you")}>
          <PiHandbagFill />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          Đang mua
        </div>
      </Link>
      <Link to={"/shop"} className={getLinkClass("/shop")}>
        <div className={getIconClass("/shop")}>
          <FaTag />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          Bán hàng
        </div>
      </Link>
    </div>
  );
};

export default LeftSideBarMarket;
