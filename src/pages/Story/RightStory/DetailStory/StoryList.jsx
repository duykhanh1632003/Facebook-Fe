import React, { useRef, useState, useEffect } from "react";
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
        setActiveUserIndex(users.length - 1);
      }
    } else {
      activeUserSwiper.slidePrev();
    }
  };

  useEffect(() => {
    const activeUserSwiper =
      userSwiperRefs.current[activeUserIndex].current.swiper;
    activeUserSwiper.slideTo(0, 0);
  }, [activeUserIndex]);

  return (
    <div className="h-full w-full">
      {users.map((user, index) => (
        <div
          key={user.userId}
          style={{ display: index === activeUserIndex ? "block" : "none" }}
        >
          <UserStory
            handleNext={handleNext}
            handleBack={handleBack}
            user={user}
            swiperRef={userSwiperRefs.current[index]}
            setUserEnd={setIsUserEnd}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryList;
