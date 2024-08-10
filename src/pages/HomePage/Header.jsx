import LeftHeader from "../Header-item/LeftHeader";
import MiddleHeader from "../Header-item/MiddleHeader";
import RightHeader from "../Header-item/RightHeader";
import "./Header.css";

const Header = () => {
  return (
    <div className="h-[55px] bg-white z-10 fixed  shadow-md  header">
      <div className="flex h-[55px] pt-[8px] pb-2 dark:bg-[#242526]">
        <LeftHeader />
        <MiddleHeader />
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
