import { Outlet } from "react-router-dom";
import Header from "../pages/HomePage/Header";
import LeftSideBar from "../pages/HomePage/Home-left/LeftSideBar";
import RightSideBar from "../pages/HomePage/Home-right/RightSideBar";

const RootLayout = () => {
  return (
      <div className="w-full h-full">
        <div className="z-4">
          <Header />
        </div>
        <div className="flex h-screen dark:bg-black bg-[rgb(240,242,245)] w-full  z-1">
          <LeftSideBar />
          <section className="flex h-full ">
            <Outlet />
          </section>
          <RightSideBar />
        </div>
      </div>
  );
};

export default RootLayout;
