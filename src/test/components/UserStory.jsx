import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import StoryItem from "./StoryItem";

const UserStory = ({ user, swiperRef, setUserEnd }) => {
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    swiperInstance.on("reachEnd", () => setUserEnd(true));
    return () => {
      swiperInstance.off("reachEnd");
    };
  }, [swiperRef, setUserEnd]);

  return (
    <div className="user-story">
      <div className="user-info">
        <img src={user.avatar} alt={user.userName} className="user-avatar" />
        <span className="user-name">{user.userName}</span>
      </div>
      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 60000 }}
        modules={[Pagination, Autoplay]}
        className="story-swiper"
      >
        {user.stories.map((story) => (
          <SwiperSlide key={story.storyId}>
            <StoryItem story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserStory;
