import React from "react";
import HeaderRecs from "./HeaderRecs/HeaderRecs";
import { useState } from "react";
import Compatibles from "./Compatibles/Compatibles";
import MessageTinder from "./MessageTinder/MessageTinder";

const LeftRecs = () => {
  const [isCompatibles, setIsCompatibles] = useState(true);

  const handleOnChangeCompatibles = () => {
    setIsCompatibles(!isCompatibles);
  };
  return (
    <div className="h-full w-[375px] ">
      <HeaderRecs />
      <div className="flex w-full p-2 ml-2">
        <div
          className="w-[128px] cursor-pointer mr-2"
          onClick={handleOnChangeCompatibles}
        >
          <div className="font-bold text-white pl-1">Các Tương Hợp</div>
          {isCompatibles && <div className="h-[2px] w-full bg-[#FE4358]"></div>}
        </div>
        <div
          className="w-[76px] cursor-pointer"
          onClick={handleOnChangeCompatibles}
        >
          <div className="font-bold text-white pl-2">Tin nhắn</div>
          {!isCompatibles && (
            <div className="h-[2px] w-full bg-[#FE4358]"></div>
          )}
        </div>
      </div>
      <div className="w-full h-full">
        {isCompatibles ? <Compatibles /> : <MessageTinder />}
      </div>
    </div>
  );
};

export default LeftRecs;
