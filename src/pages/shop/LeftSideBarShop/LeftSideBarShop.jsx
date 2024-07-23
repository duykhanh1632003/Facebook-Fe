import React from "react";
import { MdDashboard } from "react-icons/md";

const LeftSideBarShop = () => {
  return (
    <div className="w-[307px] p-3 bg-white h-full pt-5">
      <div className="h-[49px] w-full flex items-center text-xl font-bold text-[#777687] rounded-md bg-[#F1F1F1] p-2">
        <MdDashboard className="mr-2" />
        <div>Dashboard</div>
      </div>
    </div>
  );
};

export default LeftSideBarShop;
