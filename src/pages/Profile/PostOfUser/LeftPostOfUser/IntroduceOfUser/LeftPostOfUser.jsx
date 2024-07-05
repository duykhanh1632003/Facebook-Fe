import React from "react";
import IntroduceOfUser from "./IntroduceOfUser/IntroduceOfUser";
import ImgOfUser from "./ImgOfUser/ImgOfUser";
import FriendOfUser from "./FriendOfUser/FriendOfuser";

const LeftPostOfUser = () => {
  return (
    <div className="w-[426px] mt-[15px] ml-[210px]">
      <IntroduceOfUser />
      <ImgOfUser />
      <FriendOfUser />
    </div>
  );
};

export default LeftPostOfUser;
