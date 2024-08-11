import { BsChevronDown } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import useComponentHideAvatar from "../../../hooks/useComponentHideAvatar";
import { RiLogoutBoxRFill } from "react-icons/ri";
import useLogout from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import i18n from "../../../language/i18n.js";
import { useTranslation } from "react-i18next";

const HeaderAvatar = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentHideAvatar(false);

  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  const { t } = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLogout = async () => {
    await logout();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    localStorage.setItem("language", lng);
  };

  useEffect(() => {
    if (isComponentVisible) {
      const timeout = setTimeout(() => {
        setIsComponentVisible(false);
      }, 50000);

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
          className={`absolute mt-[5px] p-1 bg-[#FFFFFF] dark:bg-[#18191A] w-[330px] flex flex-col ml-[-290px] rounded-lg pl-[1px] transition-transform duration-500 ${
            isFlipped ? "transform rotate-y-180" : ""
          }`}
        >
          {!isFlipped ? (
            <>
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
                <div className="dark:text-white font-medium">
                  {authUser.user.firstName} {authUser.user.lastName}
                </div>
              </Link>
              <div
                className="h-[60px] w-full p-2 cursor-pointer mb-2 bg-[#FFFFFF] dark:bg-[#242526] flex items-center text-black dark:text-white rounded-lg hover:bg-[#d7d6d6] dark:hover:bg-[#3A3B3C]"
                onClick={() => setIsFlipped(true)}
              >
                <div className="w-[36px] h-[36px] mr-3 bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-full text-black dark:text-white text-2xl flex items-center justify-center">
                  <FaLanguage />
                </div>
                <div className="dark:text-white font-medium">
                  {t("Ngôn ngữ")}
                </div>
              </div>
              <div
                onClick={handleLogout}
                className="h-[60px] w-full p-2 cursor-pointer bg-[#FFFFFF] dark:bg-[#242526] flex items-center text-black dark:text-white rounded-lg hover:bg-[#d7d6d6] dark:hover:bg-[#3A3B3C]"
              >
                <div className="w-[36px] h-[36px] mr-3 bg-[#E4E6EB]  dark:bg-[#3A3B3C] rounded-full text-black dark:text-white text-2xl flex items-center justify-center">
                  <RiLogoutBoxRFill />
                </div>
                <div className="dark:text-white font-medium">
                  {t("Đăng xuất")}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div
                className="w-full text-right p-2 cursor-pointer"
                onClick={() => setIsFlipped(false)}
              >
                <IoMdArrowRoundBack className="text-black dark:text-white text-2xl" />
              </div>
              <div
                className="flex items-center"
                onClick={() => changeLanguage("en")}
              >
                <div
                  className={` w-[12px] h-[12px] rounded-full border-2 border-gray-400 ${
                    selectedLanguage === "en" ? "bg-black" : "bg-transparent"
                  }`}
                  style={{ bottom: "-18px", left: "12px" }}
                />
                <button className="w-[36px] h-[36px] rounded-full text-black dark:text-white text-lg flex items-center justify-center mb-2 relative">
                  EN
                </button>
              </div>
              <div
                className="flex items-center"
                onClick={() => changeLanguage("vi")}
              >
                <div
                  className={`w-[12px] h-[12px] rounded-full border-2 border-gray-400 ${
                    selectedLanguage === "vi" ? "bg-black" : "bg-transparent"
                  }`}
                  style={{ bottom: "-18px", left: "12px" }}
                />
                <button className="w-[36px] h-[36px] rounded-full text-black dark:text-white text-lg flex items-center justify-center relative">
                  VI
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
