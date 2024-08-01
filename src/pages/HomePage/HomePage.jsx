import { useParams } from "react-router-dom";
import LeftSideBar from "./Home-left/LeftSideBar";
import MiddleSideBar from "./Home-middle/MiddleSideBar";
import RightSideBar from "./Home-right/RightSideBar";
import { axiosHaveAuth } from "../../util/axios";
import { useEffect } from "react";
const HomePage = () => {
  const instance = axiosHaveAuth();
  const params = useParams();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("da vao day");

      instance
        .post("/api/save-location", {
          latitude,
          longitude,
        })
        .then((response) => {
          console.log("Location saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving location:", error);
        });
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  }, [params]);
  return (
    <div className="flex h-full dark:bg-[#18191A] bg-[#F0F2F5] w-full pt-4">
      <LeftSideBar />
      <MiddleSideBar />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
