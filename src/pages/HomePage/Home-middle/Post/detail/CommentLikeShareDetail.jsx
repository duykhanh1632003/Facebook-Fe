import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

const CommentLikeShareDetail = () => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-1">
      <div className="w-[110px] h-[33px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#eeeaea9f] transition duration-300">
        <div className="text-[#757779] ">
          <AiOutlineLike className="text-2xl" />
        </div>
        <div className="ml-2 text-[#757779] font-medium mr-2">Thích</div>
      </div>
      <div className="w-[110px] h-[33px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#eeeaea9f] transition duration-300">
        <div className="text-[#757779] ">
          <FaRegComment className="text-2xl" />
        </div>
        <div className="ml-2 text-[#757779] font-medium mr-2">Bình luận</div>
      </div>
      <div className="w-[110px] h-[33px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#eeeaea9f] transition duration-300">
        <div className="text-[#757779] ">
          <RiShareForwardLine className="text-2xl" />
        </div>
        <div className="ml-2 text-[#757779] font-medium mr-2">Chia sẻ</div>
      </div>
    </div>
  );
};

export default CommentLikeShareDetail;
