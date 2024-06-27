import moment from "moment";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdCancel, MdPublic } from "react-icons/md";
import { Link } from "react-router-dom";

const TopAvtDetailPost = ({ author, createdAt, content }) => {
  const timeFromNow = (date) => {
    const now = moment();
    const postDate = moment(date);
    if (now.diff(postDate, "days") >= 7) {
      return postDate.format("MMM Do YYYY");
    }
    return postDate.fromNow();
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[41px] h-[41px] rounded-full">
            <img
              className="w-[41px] h-[41px] rounded-full object-cover"
              src={author.avatar}
              alt="avt"
            />
          </div>
          <div className="ml-[8px]">
            <div className="text-md font-bold">
              {author.firstName} {author.lastName}
            </div>
            <div className="flex">
              <div className="text-[11px] font-medium pr-1 text-[#606770]">
                {timeFromNow(createdAt)}
              </div>
              <div className="text-[#606770]">
                <MdPublic />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center h-[50px] mr-3">
          <div className="h-[30px] cursor-pointer w-[30px] rounded-full mt-1 flex items-center justify-center hover:bg-[#eeeaea9f]">
            <BsThreeDots className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="text-sm">{content}</div>
    </div>
  );
};

export default TopAvtDetailPost;
