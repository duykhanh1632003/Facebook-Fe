import { useState } from "react";
import CreatePostVideo from "./CreatePostVideo/CreatePostVideo";
import { useAuthContext } from "../../../context/AuthContext";
import WatchVideo from "./WatchVideo/WatchVideo";

const MiddleWatch = () => {
  const [showModal, setShowModal] = useState(false);
  const { authUser } = useAuthContext();

  return (
    <div className="w-[1158px] bg-blue-500 ml-[360px] overflow-y-auto">
      <div className="w-[822px] ml-[100px] mt-3">
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
              onClick={() => setShowModal(true)}
              className="flex items-center mt-[9px] text-[#65676B]"
            >
              Tải video lên
            </button>
          </div>
        </div>

        <CreatePostVideo showModal={showModal} setShowModal={setShowModal} />
        <WatchVideo />
        <div className="h-[800px]"></div>
      </div>
    </div>
  );
};

export default MiddleWatch;
