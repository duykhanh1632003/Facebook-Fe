import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import Cry from "../../../../../animation/animationComponent/Cry";
import Like from "../../../../../animation/animationComponent/Like";
import Love from "../../../../../animation/animationComponent/Love";
import Phanno from "../../../../../animation/animationComponent/Phanno";
import Wow from "../../../../../animation/animationComponent/Wow";
import "./CommentLikeShare.css";
import AngryIcon from "../../../../../img/AngryIcon";
import FavofriteIcon from "../../../../../img/FavofriteIcon";
import HahaIcon from "../../../../../img/HahaIcon";
import LikeIcon from "../../../../../img/LikeIcon";
import WowIcon from "../../../../../img/WowIcon";
import Haha from "../../../../../animation/animationComponent/Haha";
import { useAuthContext } from "../../../../../context/AuthContext";
import CryIcon from "../../../../../img/CryIcon";
import { axiosHaveAuth } from "../../../../../util/axios";
import { useTranslation } from "react-i18next";

const CommentLikeShareVideo = ({
  postId,
  likes: initialLikes = [],
  comments = [],
  share = [],
  view,
}) => {
  const { t } = useTranslation();
  const [showEmojis, setShowEmojis] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [likes, setLikes] = useState(initialLikes);
  const instance = axiosHaveAuth();
  const { authUser } = useAuthContext();
  const [lengthLike, setLengthLike] = useState(0);

  useEffect(() => {
    const userLike = likes?.find(
      (like) => like.userId._id === authUser.user._id
    );
    setLengthLike(likes?.length);
    if (userLike) {
      setReaction(userLike.type);
    } else {
      setReaction(null);
    }
  }, [likes, authUser]);

  const handleMouseEnter = () => {
    setShowEmojis(true);
  };

  const handleMouseLeave = () => {
    setShowEmojis(false);
  };

  const handlePostFeel = async (typeFeel) => {
    try {
      const updatedLikes = await updateReaction(typeFeel);
      setLikes(updatedLikes);
      setShowEmojis(false);
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const handleLikePost = async () => {
    try {
      const updatedLikes = await updateReaction(reaction ? null : "like");
      setLikes(updatedLikes);
      setShowEmojis(false);
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const updateReaction = async (typeFeel) => {
    if (reaction === typeFeel) return likes;
    setReaction(typeFeel);
    const { data } = await instance.post("/api/post/feelingPost", {
      userId: authUser.user._id,
      postId,
      type: typeFeel,
    });
    setLengthLike(data.likes.length);
    return data.likes;
  };

  const getReactionIconAndText = () => {
    switch (reaction) {
      case "like":
        return {
          icon: <LikeIcon />,
          text: t("HomePage.MiddleSideBar.Like"),
          color: "text-blue-500",
        };
      case "favourite":
        return {
          icon: <FavofriteIcon />,
          text: t("HomePage.MiddleSideBar.Favorite"),
          color: "text-red-500",
        };
      case "smile":
        return { icon: <HahaIcon />, text: "Haha", color: "text-yellow-500" };
      case "wow":
        return { icon: <WowIcon />, text: "Wow", color: "text-yellow-500" };
      case "cry":
        return {
          icon: <CryIcon />,
          text: t("HomePage.MiddleSideBar.Sad"),
          color: "text-yellow-500",
        };
      case "angry":
        return {
          icon: <AngryIcon />,
          text: t("HomePage.MiddleSideBar.Angry"),
          color: "text-orange-500",
        };
      default:
        return {
          icon: <AiOutlineLike />,
          text: t("HomePage.MiddleSideBar.Like"),
          color: "text-[#757779]",
        };
    }
  };

  const { icon, text, color } = getReactionIconAndText();

  return (
    <div className="w-full dark:bg-[#3A3B3C]">
      <div className="flex w-full justify-between items-center text-[#77797C] dark:text-[#BBB] pl-[16px] pr-[16px] pt-[12px]">
        <div className="flex">
          <LikeIcon />
          <div className="text-[13px] font-normal text-[#65676B] dark:text-[#BBB]">
            {lengthLike} {t("HomePage.MiddleSideBar.Like")}
          </div>
        </div>
        <div className="text-[13px] font-normal text-[#65676B] dark:text-[#BBB]">
          {comments?.length || 0} {t("HomePage.MiddleSideBar.Comments")}
        </div>
        <div className="text-[13px] font-normal text-[#65676B] dark:text-[#BBB]">
          {view || 0} {t("HomePage.MiddleSideBar.View")}
        </div>
        <div className="text-[13px] font-normal text-[#65676B] dark:text-[#BBB]">
          {share?.length || 0} {t("HomePage.MiddleSideBar.Share")}
        </div>
      </div>
      <div className="pl-[8px] pr-[8px] pt-[8px] pb-[8px] mt-[4px]">
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="reaction-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div onClick={handleLikePost} className="reaction-button">
              <div className={`text-2xl ${color}`}>{icon}</div>
              <div className={`ml-2 font-medium mr-2 ${color}`}>{text}</div>
            </div>
            {showEmojis && (
              <div className="emoji-bar justify-between w-[250px] h-[50px]">
                <div
                  onClick={() => handlePostFeel("like")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Like />
                </div>
                <div
                  onClick={() => handlePostFeel("favourite")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Love />
                </div>
                <div
                  onClick={() => handlePostFeel("smile")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Haha />
                </div>
                <div
                  onClick={() => handlePostFeel("wow")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Wow />
                </div>
                <div
                  onClick={() => handlePostFeel("cry")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Cry />
                </div>
                <div
                  onClick={() => handlePostFeel("angry")}
                  className="w-5 h-5 mr-1 hover:scale-[1.3] flex items-center justify-center"
                >
                  <Phanno />
                </div>
              </div>
            )}
          </div>
          <div className="reaction-button">
            <div className="text-[#757779] dark:text-[#BBB]">
              <FaRegComment className="text-2xl" />
            </div>
            <div className="ml-2 text-[#757779] dark:text-[#BBB] font-medium mr-2">
              {t("HomePage.MiddleSideBar.Comments")}
            </div>
          </div>
          <div className="reaction-button">
            <div className="text-[#757779] dark:text-[#BBB]">
              <RiShareForwardLine className="text-2xl" />
            </div>
            <div className="ml-2 text-[#757779] dark:text-[#BBB] font-medium mr-2">
              {t("HomePage.MiddleSideBar.Share")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentLikeShareVideo;
