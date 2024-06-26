import { Outlet } from "react-router-dom";
import Header from "../pages/HomePage/Header";
import LeftSideBar from "../pages/HomePage/Home-left/LeftSideBar";
import RightSideBar from "../pages/HomePage/Home-right/RightSideBar";

const RootLayout = () => {
  return (
    <div className="w-full h-screen bg-[#F0F2F5]">
      <div className="z-4">
        <Header />
      </div>
      <div className="flex h-screen dark:bg-black bg-[#F0F2F5])] w-full  z-1">
        <LeftSideBar />
        <section className="flex h-screen bg-[#F0F2F5]">
          <Outlet />
        </section>
        <RightSideBar />
      </div>
    </div>
  );
};

export default RootLayout;
