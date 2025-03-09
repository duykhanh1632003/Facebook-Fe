import { FaFacebookMessenger } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { BsGrid3X3GapFill } from "react-icons/bs";
import ChangeDarkMode from "../../hooks/ChangeDarkMode";
import HeaderAvatar from "./HeaderAvatar/HeaderAvatar";
import { Link } from "react-router-dom";

const RightHeader = () => {
  return (
    <div className=" flex z-10 dark:bg-[#242526]">
      <div className="box-right-top-bar-item dark:bg-[#242526]">
        <div>
          <ChangeDarkMode />
        </div>
      </div>
      <div className="box-right-top-bar-item dark:bg-[#3A3B3C]  dark:text-white">
        <BsGrid3X3GapFill className="text-xl" />
      </div>
      <Link to={"/messenger"} className="box-right-top-bar-item dark:bg-[#3A3B3C]  dark:text-white">
        <FaFacebookMessenger className="text-xl" />
      </Link>
      <div className="box-right-top-bar-item dark:bg-[#3A3B3C]  dark:text-white">
        <IoMdNotifications className="text-2xl" />
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default RightHeader;
