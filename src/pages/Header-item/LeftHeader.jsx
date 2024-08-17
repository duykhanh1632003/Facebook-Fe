import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { WiDirectionLeft } from "react-icons/wi";
import { BsX } from "react-icons/bs";
import useComponentVisible from "../../hooks/useComponentVisible.jsx";
const LeftHeader = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const changeButton = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    //tim kiem fb
    <div className="h-full leftheader">
      {!isComponentVisible ? (
        <div className="flex w-[304px] pl-[16px]">
          <Link to={"/"} className="w-[40px] rounded-full">
            <img src="/src/assets/Facebook_Logo_(2019).png" alt="logo" />
          </Link>
          <div className="w-[237px] flex bg-[#F0F2F5] rounded-full pl-3 ml-[7px]">
            <CiSearch className="mt-[13px] text-gray-300 mr-2 text-md " />
            <input
              className="border-none bg-[#F0F2F5] focus:border-transparent focus:outline-none w-13 rounded-full"
              placeholder="Tìm kiếm trên facebook"
              onClick={changeButton}
            />
          </div>
        </div>
      ) : (
        <div
          className="flex w-[304px] h-[505px] bg-white ml-0 flex-col shadow-lg rounded-lg flex-1 leftheader"
          style={{ zIndex: 2 }}
          ref={ref}
        >
          <div className="flex h-[52px] ml-[8px]">
            <div
              className="rounded-full w-[40px] h-[40px] hover:bg-gray-300 items-center justify-center flex"
              onClick={changeButton}
            >
              <WiDirectionLeft className="text-4xl rounded-full" />
            </div>
            <div className="w-[235px] flex bg-[#F0F2F5] rounded-full pl-3 ml-[15px] mb-2 h-[38px]">
              <input
                className="border-none bg-[#F0F2F5] focus:border-transparent focus:outline-none w-13 rounded-full"
                placeholder="Tìm kiếm trên facebook"
              />
            </div>
          </div>
          <div className="flex justify-between ml-[16px] mr-[16px] mt-[4px]">
            <div className="font-semibold cursor-pointer">Gần đây</div>
            <div className="font-normal text-sm text-blue-600 cursor-pointer">
              Chỉnh sửa
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="box-left-bar-item">
            <div className="flex mt-[7px] pr-[16px]">
              <div className="w-[38px] bg-blue-700 h-[38px] mr-[14px] rounded-full flex items-center justify-center ">
                <img
                  className="rounded-full"
                  src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
                />
              </div>
              <div className="w-[204px]">
                <div className="font-medium">Hoàng Quốc Toàn</div>
                <div className="font-sm text-current text-xs">Bạn bè</div>
              </div>
              <div className="flex items-center justify-center w-[25px] h-[25px] hover:bg-opacity-50 hover:bg-gray-50 hover:rounded-full mt-2">
                <BsX className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
