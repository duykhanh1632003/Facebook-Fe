import React from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

const IntroduceOfUser = () => {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <div className="font-bold text-2xl">Giới thiệu</div>
      <div className="w-full flex items-center justify-center mt-2 font-medium text-md">
        Tiểu sử của tôi
      </div>
      <div className="mt-3 w-full h-[36px] rounded-md bg-[#E4E6EB] flex items-center justify-center font-medium">
        Chỉnh sửa tiểu sử
      </div>
      <div className="flex items-center w-full mt-3">
        <div className="mr-2">
          <FaHouseChimney />
        </div>
        <div className="flex">
          <div className="mr-2">Sống tại</div>
          <div className="font-bold">Hà Nội</div>
        </div>
      </div>
      <div className="flex items-center w-full mt-3">
        <div className="mr-2">
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
