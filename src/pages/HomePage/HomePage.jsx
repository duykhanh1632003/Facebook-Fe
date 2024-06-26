import LeftSideBar from "./Home-left/LeftSideBar";
import MiddleSideBar from "./Home-middle/MiddleSideBar";
import RightSideBar from "./Home-right/RightSideBar";
const HomePage = () => {
  return (
    <div className="flex h-full dark:bg-black bg-[#F0F2F5] w-full pt-4">
      <LeftSideBar />
      <MiddleSideBar />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
