import React from "react";

const HeadProduct = ({ name }) => {
  return (
    <div className="w-full h-[80px] rounded-lg bg-white p-4 justify-between shadow-md">
      <div className="font-md text-xl font-bold text-[#777687]">{name}</div>
    </div>
  );
};

export default HeadProduct;
