import { FaFacebookMessenger } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { BsGrid3X3GapFill } from "react-icons/bs";
import ChangeDarkMode from "../../hooks/ChangeDarkMode";
import HeaderAvatar from "./HeaderAvatar/HeaderAvatar";

const RightHeader = () => {
  return (
    <div className=" flex z-10">
      <div className="box-right-top-bar-item">
        <div>
          <ChangeDarkMode />
        </div>
      </div>
      <div className="box-right-top-bar-item">
        <BsGrid3X3GapFill className="text-xl" />
      </div>
      <div className="box-right-top-bar-item">
        <FaFacebookMessenger className="text-xl" />
      </div>
      <div className="box-right-top-bar-item">
        <IoMdNotifications className="text-2xl" />
      </div>
      <HeaderAvatar />
    </div>
  );
};

export default RightHeader;
