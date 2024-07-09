import React from "react";
import { IoMdAdd } from "react-icons/io";
import AllOfStory from "./AllOfStory/AllOfStory";

const MiddleLeftStory = () => {
  return (
    <div className="p-2 overflow-y-auto h-full">
      <div className="font-bold text-2xl p-1">Tin</div>
      <div className="flex m-1">
        <div className="text-blue-500 text-sm font-medium mr-1">
          Kho lưu trữ
        </div>
        <div className="text-blue-500 text-sm font-medium flex items-center justify-center pb-3 mr-1">
          .
        </div>

        <div className="text-blue-500 text-sm font-medium">Cài đặt</div>
      </div>

      <div className="p-2">
        <div className="font-medium">Tin của bạn</div>
        <div className="h-[78px] w-full flex mt-2">
          <div className="w-[63px] h-[63px] rounded-full bg-[#F0F2F5] text-blue-500 font-bold text-2xl flex items-center justify-center">
            <IoMdAdd />
          </div>
          <div className="ml-2 pt-2">
            <div className="font-medium">Tạo tin</div>
            <div className="text-sm">
              Bạn có thể chia sẻ ảnh hoặc viết gì đó
            </div>
          </div>
        </div>
      </div>
      <AllOfStory />
    </div>
  );
};

export default MiddleLeftStory;
