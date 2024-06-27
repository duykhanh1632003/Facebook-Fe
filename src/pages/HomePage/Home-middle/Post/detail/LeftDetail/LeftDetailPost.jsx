import React from "react";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const LeftDetailPost = ({ image }) => {
  return (
    <div>
      <div className="absolute">
        <div className="w-[40px] h-[40px] rounded-full flex mt-2 ml-4">
          <Link
            to="/"
            className="h-[35px] w-[35px] cursor-pointer rounded-full text-[35px] mr-1"
          >
            <MdCancel />
          </Link>
          <Link to="/">
            <img src="/src/assets/Facebook_Logo_(2019).png" alt="logo" />
          </Link>
        </div>
      </div>
      <div className="w-[1174px] bg-[#ced9e3] h-[729px] flex items-center justify-center object-contain">
        <img className="h-[729px]" src={image} alt="img" />
      </div>
    </div>
  );
};

export default LeftDetailPost;
