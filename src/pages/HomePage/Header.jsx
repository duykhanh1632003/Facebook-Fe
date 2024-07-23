import LeftHeader from "../Header-item/LeftHeader";
import MiddleHeader from "../Header-item/MiddleHeader";
import RightHeader from "../Header-item/RightHeader";
import "./Header.css";
const Header = () => {
  return (
    <div className="h-[55px] z-10 fixed border-l-amber-900flex bg-white shadow-md header dark:bg-[#242526]">
      <div className=" flex header h-[55px] z-10 dark:bg-[#242526]   pt-[8px] pb-2">
        <LeftHeader />
        <MiddleHeader />
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
