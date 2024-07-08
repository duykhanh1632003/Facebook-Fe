import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import UserStory from "./UserStory";

const StoryList = ({ users }) => {
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [isUserEnd, setIsUserEnd] = useState(false);
  const userSwiperRefs = useRef(users.map(() => React.createRef()));

  const handleNext = () => {
    const activeUserSwiper =
      userSwiperRefs.current[activeUserIndex].current.swiper;
    if (activeUserSwiper.isEnd) {
      if (activeUserIndex < users.length - 1) {
        setActiveUserIndex(activeUserIndex + 1);
      } else {
        setActiveUserIndex(0); // Loop back to the first user
      }
      setIsUserEnd(false);
    } else {
      activeUserSwiper.slideNext();
    }
  };

  const handleBack = () => {
    const activeUserSwiper =
      userSwiperRefs.current[activeUserIndex].current.swiper;
    if (activeUserSwiper.isBeginning) {
      if (activeUserIndex > 0) {
        setActiveUserIndex(activeUserIndex - 1);
      } else {
        setActiveUserIndex(users.length - 1); // Loop back to the last user
      }
      setIsUserEnd(false);
    } else {
      activeUserSwiper.slidePrev();
    }
  };

  return (
    <div className="story-list">
      {users.map((user, index) => (
        <div
          key={user.userId}
          style={{ display: index === activeUserIndex ? "block" : "none" }}
        >
          <UserStory
            user={user}
            swiperRef={userSwiperRefs.current[index]}
            setUserEnd={setIsUserEnd}
          />
        </div>
      ))}
      <div className="navigation-buttons">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryList;
