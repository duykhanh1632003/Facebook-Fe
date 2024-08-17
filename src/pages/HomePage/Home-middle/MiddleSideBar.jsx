import { useRef, useEffect } from "react";
import SlickCarousel from "./SlickCarousel";
import Status from "./Post/Status";
import "./MiddleSideBar.css"; // Import file for custom styles
import Posted from "./Post/Posted";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../../redux/post/postsThunks";

const MiddleSideBar = () => {
  const middleRef = useRef();
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (middleRef.current) {
      middleRef.current.scrollTop = window.scrollY;
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]); // Đảm bảo dispatch được gọi đúng
  useEffect(() => {
    // Thêm sự kiện lắng nghe cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Xóa sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-[587px] sticky h-screen overflow-y-auto max-h-screen middlesidebar pt-4"
      ref={middleRef}
    >
      <SlickCarousel />
      <Status />
      <Posted />
      <div className="h-[100px] w-full mt-5 items-center flex justify-center"></div>
    </div>
  );
};

export default MiddleSideBar;
