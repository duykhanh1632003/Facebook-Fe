import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import StoryItem from "./StoryItem";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const UserStory = ({
  user,
  swiperRef,
  setUserEnd,
  handleNext,
  handleBack,
  currentUserIndex,
}) => {
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    swiperInstance.on("reachEnd", () => setUserEnd(true));
    return () => {
      swiperInstance.off("reachEnd");
    };
  }, [swiperRef, setUserEnd]);

  useEffect(() => {
    const bullets = document.querySelectorAll(
      `.swiper-pagination-${user.userId} .swiper-pagination-bullet`
    );
    const bulletWidth = 300 / user.stories.length;
    bullets.forEach((bullet) => {
      bullet.style.width = `${bulletWidth}px`;
    });
  }, [user, handleNext, handleBack, swiperRef, setUserEnd, currentUserIndex]);

  return (
    <div className="user-story relative z-1">
      <div className="flex absolute justify-between w-[549px] mt-[300px] ml-[310px] z-5">
        <button
          className="w-[51px] h-[51px] rounded-full bg-[#999999] text-3xl flex items-center justify-center hover:bg-white cursor-pointer z-5"
          onClick={handleBack}
        >
          <MdNavigateBefore />
        </button>
        <button
          className="w-[51px] h-[51px] rounded-full bg-[#999999] text-3xl flex items-center justify-center hover:bg-white cursor-pointer"
          onClick={handleNext}
        >
          <MdNavigateNext />
        </button>
      </div>

      <div className="user-info absolute text-black z-2 ml-[420px] w-full h-[50px] mt-[20px] ">
        {user.stories.length > 1 ? (
          <div className={`swiper-pagination-${user.userId} z-2`}>
            <div className="progress-bar"></div>
          </div>
        ) : (
          <div className="w-[300px] h-[5px] bg-blue-500 mt-3 ml-3 mb-1"></div>
        )}
        <div className="flex">
          <img
            src={user.avatar}
            alt={user.userName}
            className="w-[40px] h-[40px] rounded-full mt-2 object-cover"
          />
          <span className="user-name text-black font-medium text-md ml-2">
            {user.userName}
          </span>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: `.swiper-pagination-${user.userId}`,
        }}
        autoplay={{ delay: 60000 }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full ml-[400px] pt-3 rounded-md"
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            setUserEnd(true);
          } else {
            setUserEnd(false);
          }
        }}
      >
        {user.stories.map((story) => (
          <SwiperSlide key={story.storyId}>
            <StoryItem story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex absolute mt-[100px]">
        <div className="w-[303px] h-[42px] bg-black rounded-3xl border-2 border-zinc-50 text-[#ffffff5b] flex items-center p-2">
          Trả lời.....
        </div>
      </div>
    </div>
  );
};

export default UserStory;
