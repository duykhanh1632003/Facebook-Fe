import LeftHeader from "../Header-item/LeftHeader";
import MiddleHeader from "../Header-item/MiddleHeader";
import RightHeader from "../Header-item/RightHeader";
import "./Header.css";

const Header = () => {
  return (
    <div className="h-[55px] z-10 fixed bg-white shadow-md dark:bg-[#242526] header">
      <div className="flex h-[55px] pt-[8px] pb-2">
        <LeftHeader />
        <MiddleHeader />
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
