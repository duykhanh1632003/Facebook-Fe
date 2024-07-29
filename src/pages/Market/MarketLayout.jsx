import React from "react";
import Header from "../HomePage/Header";
import LeftSideBarMarket from "./LeftSideBarMarket/LeftSideBarMarket";
import { Outlet } from "react-router-dom";

const MarketLayout = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#F0F2F5]">
      <div className="z-4">
        <Header />
      </div>
      <div className="flex h-screen dark:bg-black bg-[rgb(240,242,245)] pt-5 w-full  z-1">
        <div className="w-[307px]">
          <LeftSideBarMarket />
        </div>
        <div className="h-full w-full pl-6 pr-6 pt-3 ml-[50px] bg-[#F0F2F5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
