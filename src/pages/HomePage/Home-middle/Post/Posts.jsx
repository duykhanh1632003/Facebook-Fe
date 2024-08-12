import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import { useAuthContext } from "../../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const [modalShow, setModalShow] = useState(false);
  const { authUser } = useAuthContext();
  const { t } = useTranslation();
  return (
    <div className="h-[67px] w-full bg-[#FFFFFF] dark:bg-[#202122] flex items-center justify-start rounded-lg">
      <div className="w-[40px] h-[40px] rounded-full ml-[13px] mt-[10px]">
        <img
          className="rounded-full w-full h-full object-cover"
          src={authUser.user.avatar}
          alt="avatar"
        />
      </div>
      <div className="w-[509px] h-[39px] bg-[#F0F2F5] dark:bg-[#303031] rounded-3xl mt-[10px] ml-[8px] pl-[14px] cursor-pointer border-none outline-none hover:bg-[#E4E6E9] dark:hover:bg-[#3A3B3C]">
        <button
          onClick={() => setModalShow(true)}
          className="flex items-center mt-[9px] text-[#65676B] dark:text-[#B0B3B8]"
        >
          {authUser.user.lastName} {t("HomePage.MiddleSideBar.WhatDoYouThing")}
        </button>
      </div>

      <CreatePost
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Posts;
