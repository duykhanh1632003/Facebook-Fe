import LeftHeader from "../Header-item/LeftHeader";
import MiddleHeader from "../Header-item/MiddleHeader";
import RightHeader from "../Header-item/RightHeader";
import "./Header.css";
const Header = () => {
  return (
    <div className="h-[55px] z-10 fixed border-l-amber-900 pt-[8px] flex bg-white shadow-md header">
      <LeftHeader />
      <MiddleHeader />
      <RightHeader />
    </div>
  );
};

export default Header;
