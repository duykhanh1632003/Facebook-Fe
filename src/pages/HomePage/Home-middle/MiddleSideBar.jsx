import { useRef, useEffect } from "react";
import SlickCarousel from "./SlickCarousel";
import Status from "./Post/Status";
import "./MiddleSideBar.css"; // Import file for custom styles
import Posted from "./Post/Posted";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../../redux/post/postsThunks";
import { axiosHaveAuth } from "../../../util/axios";
import { useParams } from "react-router-dom";

const MiddleSideBar = () => {
  const params = useParams();
  const instance = axiosHaveAuth(); // Ensure instance is declared before use

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locate = JSON.parse(localStorage.getItem("location")); // Parse the location from localStorage

      if (!locate || locate[0] !== latitude || locate[1] !== longitude) {
        instance
          .post("/api/save-location", {
            latitude,
            longitude,
          })
          .then((response) => {
            console.log("Location saved:", response.data.metadata);
            localStorage.setItem(
              "location",
              JSON.stringify(response.data.metadata.coordinates)
            );
          })
          .catch((error) => {
            console.error("Error saving location:", error);
          });
      }
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  }, [params, instance]); // Ensure instance is included in the dependencies

  const middleRef = useRef();
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (middleRef.current) {
      middleRef.current.scrollTop = window.scrollY;
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]); // Ensure dispatch is called correctly

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen max-h-full bg-[#F0F2F5] dark:bg-[#18191A] overflow-y-auto">
      <div
        className="w-[587px] z-2 h-full dark:bg-[#18191A] bg-[#F0F2F5] mt-10 sticky max-h-screen middlesidebar pt-4 ml-[458px]"
        ref={middleRef}
      >
        <SlickCarousel />
        <Status />
        <Posted userId={""} />
        <div className="h-[100px] w-full mt-5 items-center flex justify-center"></div>
      </div>
    </div>
  );
};

export default MiddleSideBar;
