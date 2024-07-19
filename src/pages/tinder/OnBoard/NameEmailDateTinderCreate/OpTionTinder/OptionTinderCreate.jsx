import React from "react";
import { FaChevronRight } from "react-icons/fa";

const OptionTinderCreate = () => {
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
            Thêm{" "}
            <span className="ml-1">
              <FaChevronRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionTinderCreate;
