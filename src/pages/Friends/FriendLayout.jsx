import { Outlet } from "react-router-dom";
import Header from "../HomePage/Header";
import LeftSideBarFriend from "./LeftSideBarFriend";

const FriendLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="z-4">
        <Header />
      </div>
      <div className="flex h-screen dark:bg-black bg-[rgb(240,242,245)] w-full  z-1">
        <LeftSideBarFriend />
        <section className="flex h-full w-[1175px] overflow-y-auto mt-5">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default FriendLayout;
