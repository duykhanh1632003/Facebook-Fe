import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdScreenSearchDesktop } from "react-icons/md";
import { LuWarehouse } from "react-icons/lu";
import { RiGroup2Line } from "react-icons/ri";
import { useLocation, NavLink } from "react-router-dom";

const MiddleHeader = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <NavLink to={"/"} className="middle-header-box">
      <div className="item-header-middle">
        <AiFillHome
          className={`${
            location === "/"
              ? "icon-header-text-middle-active"
              : "icon-header-text-middle-not-active"
          }`}
        />
      </div>

      <NavLink to={"/friends"} className="item-header-middle">
        {" "}
        <FaUserFriends
          className={`${
            location === "/friends"
              ? "icon-header-text-middle-active"
              : "icon-header-text-middle-not-active"
          }`}
        />
      </NavLink>
      <NavLink to={"/watch"} className="item-header-middle">
        {" "}
        <MdScreenSearchDesktop
          className={`${
            location === "/watch"
              ? "icon-header-text-middle-active"
              : "icon-header-text-middle-not-active"
          }`}
        />
      </NavLink>
      <NavLink to={"/market"} className="item-header-middle">
        {" "}
        <LuWarehouse
          className={`${
            location === "/market"
              ? "icon-header-text-middle-active"
              : "icon-header-text-middle-not-active"
          }`}
        />
      </NavLink>
      <NavLink to={"/group"} className="item-header-middle">
        {" "}
        <RiGroup2Line
          className={`${
            location === "/group"
              ? "icon-header-text-middle-active"
              : "icon-header-text-middle-not-active"
          }`}
        />
      </NavLink>
    </NavLink>
  );
};

export default MiddleHeader;
