import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../HomePage/Header";
import LeftSideBarShop from "./LeftSideBarShop/LeftSideBarShop";

const WatchLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="z-4">
        <Header />
      </div>
      <div className="flex h-screen dark:bg-black bg-[rgb(240,242,245)] pt-5 w-full  z-1">
        <div>
          <LeftSideBarShop />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WatchLayout;
