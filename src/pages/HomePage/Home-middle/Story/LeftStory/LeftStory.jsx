import { MdCancel } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuthContext } from "../../../../../context/AuthContext";

const LeftStory = ({ createImage, cancel }) => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-[360px] h-screen shadow-lg">
      <div className="w-full h-[54px] flex mt-[4px] items-center">
        <div className="ml-[15px] text-[#999999] text-5xl mr-1">
          <MdCancel />
        </div>
        <div className="w-[41px] h-[41px]">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" />
        </div>
      </div>
      <div className="w-full pt-[6px]">
        <div className="border-b border-gray-300 w-full"></div>
      </div>
      <div className="flex justify-between p-3">
        <div className="text-2xl font-bold">Tin của bạn</div>
        <div className="w-[41px] h-[41px] rounded-full bg-[#D8DADF] text-2xl flex items-center justify-center">
          <IoSettingsSharp />
        </div>
      </div>
      <div className="w-full flex items-center ml-3">
        <div className=" w-[60px] h-[60px] rounded-full mr-3">
          <img
            className="flex w-[60px] h-[60px] rounded-full object-cover"
            src={authUser.user.avatar}
            alt="avt"
          />
        </div>
        <div className="text-xl font-bold">
          {authUser.user.firstName} {authUser.user.lastName}
        </div>
      </div>
      <div className="w-full pt-[6px] mt-3">
        <div className="border-b border-gray-300 w-full"></div>
      </div>

      {createImage && <div>hello</div>}
      {cancel && (
        <div className="w-[360px] items-center mt-[410px] h-[73px] fixed shadow-lg flex">
          <div className="font-medium w-[124px] ml-3 mr-2 h-[36px] rounded-md bg-[#D8DADF] flex items-center justify-center">
            Bỏ
          </div>
          <div className="bg-[#0861F2] font-medium text-white w-[193px] h-[36px] rounded-md flex items-center justify-center">
            Chia sẻ lên tin
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftStory;
