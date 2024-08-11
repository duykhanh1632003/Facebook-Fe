import React from "react";
import IntroduceOfUser from "./IntroduceOfUser/IntroduceOfUser";
import ImgOfUser from "./ImgOfUser/ImgOfUser";
import FriendOfUser from "./FriendOfUser/FriendOfUser";

const LeftPostOfUser = ({ userId, friends, numberOfFriends }) => {
  return (
    <div className="w-[426px] mt-[15px] ml-[210px]">
      <IntroduceOfUser userId={userId} />
      <ImgOfUser userId={userId} />
      <FriendOfUser friends={friends} numberOfFriends={numberOfFriends} />
    </div>
  );
};

export default LeftPostOfUser;
