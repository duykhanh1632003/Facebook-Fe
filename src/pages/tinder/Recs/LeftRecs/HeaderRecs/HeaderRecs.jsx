import React from "react";
import { RiMenuSearchLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

const HeaderRecs = () => {
  return (
    <div className="h-[89px] w-[375px] bg-[#FE5048] flex items-center">
      <div className="w-[128px] p-1 pr-2 flex ml-1 rounded-3xl hover:bg-[#292727] cursor-pointer">
        <div className="w-[38px] h-[38px] rounded-full ">
          <img
            className="w-[38px] h-[38px] rounded-full object-cover"
            src="/src/assets/anh-dai-dien.jpg"
            alt="avt"
          />
        </div>
        <div className="font-bold text-white flex items-center justify-center ml-2 text-sm">
          khanhduy
        </div>
      </div>
      <div className="w-[42px] cursor-pointer hover:text-red-600 h-[42px] rounded-full bg-[#380F13] font-semibold text-white text-2xl flex items-center justify-center ml-[71px]">
        <RiMenuSearchLine />
      </div>
      <div className="w-[42px] h-[42px]  cursor-pointer hover:text-red-600 rounded-full bg-[#380F13] font-semibold text-white text-2xl flex items-center justify-center ml-3">
        <FontAwesomeIcon icon={faSuitcase} />
      </div>
      <div className="w-[42px] h-[42px]  cursor-pointer hover:text-blue-600 rounded-full bg-[#380F13] font-semibold text-white text-2xl flex items-center justify-center ml-3">
        <FontAwesomeIcon icon={faShieldAlt} />
      </div>
    </div>
  );
};

export default HeaderRecs;
