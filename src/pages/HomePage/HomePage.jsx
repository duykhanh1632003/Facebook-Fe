import { useParams } from "react-router-dom";
import LeftSideBar from "./Home-left/LeftSideBar";
import MiddleSideBar from "./Home-middle/MiddleSideBar";
import RightSideBar from "./Home-right/RightSideBar";
import { axiosHaveAuth } from "../../util/axios";
import { useEffect } from "react";
const HomePage = () => {
  
  return (
    <div className="flex h-full dark:bg-[#18191A] bg-[#F0F2F5] w-full pt-4">
      <LeftSideBar />
      <MiddleSideBar />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
