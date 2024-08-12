import React, { useRef, useState, useEffect } from "react";
import UserStory from "./UserStory";

const StoryList = ({ users, currentActiveUserIndex }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(
    currentActiveUserIndex
  );
  const [isUserEnd, setIsUserEnd] = useState(false);
  const userSwiperRefs = useRef(users.map(() => React.createRef()));
  
  useEffect(() => {
    setCurrentUserIndex(currentActiveUserIndex);
  }, [currentActiveUserIndex]);

  const handleNext = () => {
    const activeUserSwiper =
      userSwiperRefs.current[currentUserIndex].current.swiper;
    if (activeUserSwiper.isEnd) {
      if (currentUserIndex < users.length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
      } else {
        setCurrentUserIndex(0); // Loop back to the first user
      }
      setIsUserEnd(false);
    } else {
      activeUserSwiper.slideNext();
    }
  };

  const handleBack = () => {
    const activeUserSwiper =
      userSwiperRefs.current[currentUserIndex].current.swiper;
    if (activeUserSwiper.isBeginning) {
      if (currentUserIndex > 0) {
        setCurrentUserIndex(currentUserIndex - 1);
      } else {
        setCurrentUserIndex(users.length - 1);
      }
    } else {
      activeUserSwiper.slidePrev();
    }
  };

  useEffect(() => {
    const activeUserSwiper =
      userSwiperRefs?.current[currentUserIndex]?.current.swiper;
    activeUserSwiper?.slideTo(0, 0);
  }, [currentUserIndex]);

  return (
    <div className="h-full w-full">
      {users.map((user, index) => (
        <div
          key={user.userId}
          style={{ display: index === currentUserIndex ? "block" : "none" }}
        >
          <UserStory
            handleNext={handleNext}
            handleBack={handleBack}
            currentUserIndex={currentUserIndex}
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
