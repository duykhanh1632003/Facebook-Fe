import React from "react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { BsPencilFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

const OptionTinderCreate = () => {
  const [isDisplayProfile, setIsDisplayProfile] = useState(false);
  const [isSearching, setIsSearching] = useState(null);
  return (
    <div className="w-[511px]">
      <div className="w-[511px]">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Giới tính
        </label>
        <div className="w-[511px] flex text-white">
          <button className="px-4 mr-2 w-[164px] py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold">
            Nam
          </button>
          <button className="px-4 mr-2  w-[164px] py-2 border border-red-500 text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold">
            Nữ
          </button>
          <button className="px-4  w-[164px] py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground flex items-center justify-center font-bold">
            Cả hai
          </button>
        </div>
        <div className="flex mt-3 text-white">
          {isDisplayProfile ? (
            <div
              onClick={() => setIsDisplayProfile(!isDisplayProfile)}
              className="w-[25px] h-[25px] rounded-lg border-[1px] border-gray-500 mr-2 cursor-pointer"
            ></div>
          ) : (
            <div
              onClick={() => setIsDisplayProfile(!isDisplayProfile)}
              className="w-[25px] h-[25px] rounded-lg font-semibold flex items-center justify-center cursor-pointer  bg-[#FD6071] mr-2"
            >
              <FaCheck />
            </div>
          )}

          <div>Hiển thị giới tính trên hồ sơ của tôi</div>
        </div>
      </div>
      <div className="w-[511px]">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Quan tâm hồ sơ của
        </label>
        <div className="w-[511px] flex text-white">
          <button className="px-4 mr-2 w-[164px] py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold">
            Nam
          </button>
          <button className="px-4 mr-2  w-[164px] py-2 border border-red-500 text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold">
            Nữ
          </button>
          <button className="px-4  w-[164px] py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground flex items-center justify-center font-bold">
            Mọi người
          </button>
        </div>
      </div>

      <div className="w-[511px] text-white">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Đang tìm kiếm
        </label>
        {isSearching ? (
          <button className="px-4 mr-2 w-[250px]flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold flex">
            <span className="flex font-bold items-center justify-center mr-2 text-white">
              <BsPencilFill />
            </span>
            <div>Sửa mục đích hẹn hò </div>
          </button>
        ) : (
          <button className="px-4 mr-2 w-[250px]flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold flex">
            <span className="flex items-center justify-center mr-2 text-[#B9BFC8]">
              <IoMdAdd />
            </span>
            <div>Thêm mục đích hẹn hò </div>
          </button>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default OptionTinderCreate;
