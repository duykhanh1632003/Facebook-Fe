import { RiSettings5Fill } from "react-icons/ri";
import { PiVideoFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const LeftWatch = () => {
  const { t } = useTranslation();
  return (
    <div className="left-sidebar-friend w-[360px] pt-[12px] dark:bg-black bg-[#FFFFFF] h-full mt-2 fixed">
      <div className="flex justify-between pl-[17px] pr-[17px] mb-[12px]">
        <div className="text-2xl font-bold dark:text-white">Video</div>
        <div className="w-[36px] h-[36px] rounded-full text-2xl dark:bg-[#3A3B3C] dark:text-white bg-[#E4E6EB] flex items-center justify-center">
          <RiSettings5Fill />
        </div>
      </div>
      <div className="ml-2 mr-2 pt-1 pb-1 pl-2 pr-2 rounded-lg dark:bg-[#3A3B3C] bg-[#F0F2F5] flex h-[47px] cursor-pointer">
        <div className="bg-[#1877F2] w-[36px] h-[36px] rounded-full text-2xl flex items-center justify-center text-[#EBE4C9]">
          <PiVideoFill />
        </div>
        <div className="flex items-center ml-2 font-medium dark:text-white">
          {t("HomePage.MiddleSideBar.HomePage")}
        </div>
      </div>
    </div>
  );
};

export default LeftWatch;
