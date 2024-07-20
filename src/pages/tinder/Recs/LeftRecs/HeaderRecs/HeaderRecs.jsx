import React from "react";

const HeaderRecs = () => {
  return (
    <div className="h-[89px] w-full bg-[#FE5048] flex items-center">
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
    </div>
  );
};

export default HeaderRecs;
