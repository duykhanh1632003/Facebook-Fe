import React from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import BioGraphy from "./BioGraphy/BioGraphy";

const IntroduceOfUser = ({ userId }) => {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <div className="font-bold text-2xl">Giới thiệu</div>

      <BioGraphy userId={userId} />
      <div className="flex items-center w-full mt-3">
        <div className="mr-2 text-lg text-[#8C939D]">
          <FaHouseChimney />
        </div>
        <div className="flex">
          <div className="mr-2">Sống tại</div>
          <div className="font-bold">Hà Nội</div>
        </div>
      </div>
      <div className="flex items-center w-full mt-3">
        <div className="mr-2 text-lg text-[#8C939D]">
          <IoLocation />
        </div>
        <div className="flex">
          <div className="mr-2">Đến từ</div>
          <div className="font-bold">Thanh Sơn</div>
        </div>
      </div>
      <div className="mt-3 w-full h-[36px] rounded-md bg-[#E4E6EB] flex items-center justify-center font-medium">
        Chỉnh sửa chi tiết
      </div>
    </div>
  );
};

export default IntroduceOfUser;
