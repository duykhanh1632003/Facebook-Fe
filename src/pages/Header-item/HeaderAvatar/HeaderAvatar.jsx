import { BsChevronDown } from "react-icons/bs";
import { useEffect } from "react";
import useComponentHideAvatar from "../../../hooks/useComponentHideAvatar";
import { RiLogoutBoxRFill } from "react-icons/ri";
import useLogout from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const HeaderAvatar = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentHideAvatar(false);

  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (isComponentVisible) {
      const timeout = setTimeout(() => {
        setIsComponentVisible(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timeout);
    }
  }, [isComponentVisible, setIsComponentVisible]);

  return (
    <div ref={ref}>
      <div
        className="box-right-top-bar-item dark:bg-[#3A3B3C] dark:text-white"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <div>
          <img
            src={authUser.user.avatar}
            className="rounded-full h-[36px] w-full object-cover"
            alt="Avatar"
          />
        </div>
        <div className="absolute bg-gray-100 dark:bg-[#3A3B3C] rounded-full w-[12px] h-[12px] flex items-center justify-center ml-7 mt-7 cursor-pointer">
          <BsChevronDown className="text-[7px] font-semibold dark:text-white" />
        </div>
      </div>
      {isComponentVisible && (
        <div
          style={{ boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 0.1)" }}
          className="absolute mt-[5px] p-1 bg-[#FFFFFF] dark:bg-[#18191A] w-[330px] flex flex-col ml-[-290px] rounded-lg pl-[1px]"
        >
          <Link
            to={`/profile/${authUser.user._id}`}
            style={{ boxShadow: "2px 2px 3px 2px rgb(0 0 0 / 0.1)" }}
            className="h-[60px] w-full p-2 cursor-pointer mb-2 bg-[#FFFFFF] dark:bg-[#242526] flex items-center text-black dark:text-white rounded-lg hover:bg-[#d7d6d6] dark:hover:bg-[#3A3B3C]"
          >
            <div className="w-[39px] shadow-2xl h-[39px] rounded-full object-contain mr-2 dark:text-white">
              <img
                className="w-full h-full rounded-full object-cover"
                src={authUser.user.avatar}
                alt="avatar"
              />
            </div>
            <div className=" dark:text-white font-medium ">
              {authUser.user.firstName} {authUser.user.lastName}
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="h-[60px] w-full p-2 cursor-pointer bg-[#FFFFFF] dark:bg-[#242526] flex items-center text-black dark:text-white rounded-lg hover:bg-[#d7d6d6] dark:hover:bg-[#3A3B3C]"
          >
            <div className="w-[36px] h-[36px] mr-3 bg-[#E4E6EB]  dark:bg-[#3A3B3C] rounded-full text-black dark:text-white text-2xl flex items-center justify-center">
              <RiLogoutBoxRFill />
            </div>
            <div className=" dark:text-white font-medium">Đăng xuất</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
