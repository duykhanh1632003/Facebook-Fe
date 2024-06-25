import { Outlet } from "react-router-dom";
import Header from "../HomePage/Header";
import HomeProfile from "./HomeProfile";

const ProfileLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="z-4">
        <Header />
      </div>
      <div className="h-full w-full">
        <HomeProfile />
      </div>
    </div>
  );
};

export default ProfileLayout;
