import { useState } from "react";
import CreatePost from "./CreatePost";
import { useAuthContext } from "../../../../context/AuthContext";

const Posts = () => {
  const [modalShow, setModalShow] = useState(false);
  const { authUser } = useAuthContext();
  return (
    <div className="h-[67px] w-full bg-[#FFFFFF] flex items-center justify-start rounded-lg">
      <div className="w-[40px] h-[40px] rounded-full ml-[13px] mt-[10px]">
        <img
          className="rounded-full w-[40px] h-[40px] object-cover"
          src={authUser.user.avatar}
          alt="avatar"
        />
      </div>
      <div className="w-[509px] h-[39px] bg-[#F0F2F5] rounded-3xl mt-[10px] ml-[8px] pl-[14px] cursor-pointer border-none outline-none hover:bg-[#E4E6E9]">
        <button
          onClick={() => setModalShow(true)}
          className="flex items-center mt-[9px] text-[#65676B]"
        >
          {authUser.user.lastName} ơi bạn đang nghĩ gì thế?
        </button>
      </div>

      <CreatePost
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Posts;
