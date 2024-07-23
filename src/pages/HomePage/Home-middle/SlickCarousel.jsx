import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdOutlineAdd } from "react-icons/md";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosHaveAuth } from "../../../util/axios";
import { backGroundImageStr, fontFamily } from "./../../../util/background";
import { useActiveUser } from "../../../context/StoryContext";

export default function SlickCarousel() {
  const { authUser } = useAuthContext();
  const instance = axiosHaveAuth();
  const [data, setData] = useState([]);
  const { setActiveUserIndex } = useActiveUser();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    const fetchNumberOfFriends = async () => {
      try {
        const response = await instance.get("/api/stories");
        if (!response) {
          return;
        }
        setData(response.data.metadata);
      } catch (error) {
        console.error("Failed to fetch number of friends", error);
      }
    };
    fetchNumberOfFriends();
  }, []);

  const fontFamilies = fontFamily();
  const backGroundImages = backGroundImageStr();
  const navigate = useNavigate();
  const handleOnChangeRoute = (index) => {
    setActiveUserIndex(index);
    navigate("/story");
  };

  return (
    <div className="bg-[#F0F2F5] mb-[24px] dark:bg-[#18191A]">
      <Carousel responsive={responsive}>
        <Link
          to={"/stories/create"}
          className="card relative w-[250px] z-10  bg-white dark:bg-[#202122] cursor-pointer"
        >
          <div className="w-[40px] h-[40px] bg-white dark:bg-[#202122] absolute rounded-full mt-[144px] ml-[54px]">
            <div className="bg-blue-500 absolute z-20 h-[37px] w-[37px] mt-10 rounded-full flex items-center justify-center text-4xl">
              <MdOutlineAdd className="text-3xl" />
            </div>
          </div>
          <p className="absolute z-10 mt-[230px] ml-[50px]  text-black text-sm font-medium">
            Tạo tin
          </p>
          <div className="h-[202px] dark:bg-[#202122] rounded-lg relative object-contain">
            <img
              className="img-card object-cover rounded-lg h-full w-full"
              src={authUser.user.avatar}
            />
          </div>
        </Link>
        {data?.map((story, index) => (
          <div
            key={index}
            className="card relative w-[250px] z-10 cursor-pointer"
            onClick={() => handleOnChangeRoute(index)}
          >
            <div className="absolute w-[39px] h-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
              <img
                className="rounded-full w-full h-full object-cover"
                src={story.avatar}
              />
            </div>
            <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium">
              {story.uẻName}
            </p>
            {story.stories[0].type === "image" ? (
              <div className="h-[250px] rounded-lg absolute">
                <img
                  className="img-card object-cover rounded-lg h-[250px]"
                  src={story.stories[0].image}
                />
              </div>
            ) : (
              <div
                className="h-[250px] w-full rounded-lg absolute flex items-center justify-center"
                style={{
                  background:
                    backGroundImages[story.stories[0].backGround - 1].image,
                  color:
                    backGroundImages[story.stories[0].backGround - 1].color,
                  fontFamily:
                    fontFamilies[story.stories[0].font - 1].fontFamily,
                }}
              >
                <p className="text-center">{story.stories[0].text}</p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
