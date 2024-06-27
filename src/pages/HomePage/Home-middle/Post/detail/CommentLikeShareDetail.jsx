import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import Haha from "../../../../../animation/animationComponent/Haha";
import Cry from "../../../../../animation/animationComponent/cry";
import Like from "../../../../../animation/animationComponent/like";
import Phanno from "../../../../../animation/animationComponent/phanno";
import Wow from "../../../../../animation/animationComponent/wow";
import Love from "../../../../../animation/animationComponent/Love";
import LikeIcon from "../../../../../img/LikeIcon";
import HahaIcon from "../../../../../img/HahaIcon";
import CryIcon from "../../../../../img/CryIcon";
import WowIcon from "../../../../../img/WowIcon";
import AngryIcon from "../../../../../img/AngryIcon";
import FavofriteIcon from "../../../../../img/FavofriteIcon";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { axiosHaveAuth } from "../../../../../util/axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import "./CommentLikeShareDetail.css"; // Import CSS file for custom styles

const CommentLikeShareDetail = ({
  postId,
  likes: initialLikes = [],
  comments = [],
  share = [],
}) => {
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
  }, []);

  const handleMouseEnter = () => {
    setShowEmojis(true);
  };

  const handleMouseLeave = () => {
    setShowEmojis(false);
  };

  const handlePostFeel = async (typeFeel) => {
    if (!reaction) {
      try {
        setLengthLike(lengthLike + 1);
        setReaction(typeFeel); // Update local state after successful update

        const { data } = await instance.post("/api/post/feelingPost", {
          userId: authUser.user._id,
          postId: postId,
          type: typeFeel,
        });

        setLikes(data.likes); // Update likes state with the new likes array from the server
        setShowEmojis(false);
      } catch (error) {
        console.error("Failed to update reaction:", error);
        // Handle error gracefully
      }
    } else {
      try {
        setReaction(typeFeel); // Update local state after successful update
        const { data } = await instance.post("/api/post/feelingPost", {
          userId: authUser.user._id,
          postId: postId,
          type: typeFeel,
        });

        setLikes(data.likes); // Update likes state with the new likes array from the server
        setShowEmojis(false);
      } catch (error) {
        console.error("Failed to update reaction:", error);
        // Handle error gracefully
      }
    }
  };

  const handleLikePost = async () => {
    try {
      if (!reaction) {
        setReaction("like"); // Update local state after successful update
        setLengthLike(lengthLike + 1);
        const { data } = await instance.post("/api/post/feelingPost", {
          userId: authUser.user._id,
          postId: postId,
          type: "like",
        });

        setLikes(data.likes); // Update likes state with the new likes array from the server
        setShowEmojis(false);
      } else {
        setLengthLike(lengthLike - 1);
        const { data } = await instance.post("/api/post/feelingPost", {
          userId: authUser.user._id,
          postId: postId,
          type: "like",
        });

        setReaction(null); // Update local state after successful update
        setLikes(data.likes); // Update likes state with the new likes array from the server
        setShowEmojis(false);
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
      // Handle error gracefully
    }
  };

  const getReactionIconAndText = () => {
    switch (reaction) {
      case "like":
        return { icon: <LikeIcon />, text: "Like", color: "text-blue-500" };
      case "favourite":
        return {
          icon: <FavofriteIcon />,
          text: "Yêu thích",
          color: "text-red-500",
        };
      case "smile":
        return { icon: <HahaIcon />, text: "Haha", color: "text-yellow-500" };
      case "wow":
        return { icon: <WowIcon />, text: "Wow", color: "text-yellow-500" };
      case "cry":
        return { icon: <CryIcon />, text: "Buồn", color: "text-yellow-500" };
      case "angry":
        return {
          icon: <AngryIcon />,
          text: "Phẫn nộ",
          color: "text-orange-500",
        };
      default:
        return {
          icon: <AiOutlineLike />,
          text: "Like",
          color: "text-[#757779]",
        };
    }
  };

  const { icon, text, color } = getReactionIconAndText();

  return (
    <div>
      <div className="flex justify-between mt-[36px] w-[331px]">
        <div className="flex">
          <LikeIcon />
          <div className="text-[#606770] text-[14px]">{lengthLike}</div>
        </div>
        <div className="flex text-[#606770]">
          <div className="flex items-center justify-center mr-2">
            <div className="mr-1">{comments.length}</div>
            <div>
              <FaComment />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mr-1">{share.length}</div>
            <div>
              <FaShare />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[331px] pt-[6px]">
        <div className="border-b border-gray-300 w-full"></div>
      </div>
      <div className="w-full h-full flex items-center justify-center mt-1">
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
          <div className="text-[#757779]">
            <FaRegComment className="text-2xl" />
          </div>
          <div className="ml-2 text-[#757779] font-medium mr-2">Comment</div>
        </div>
        <div className="reaction-button">
          <div className="text-[#757779]">
            <RiShareForwardLine className="text-2xl" />
          </div>
          <div className="ml-2 text-[#757779] font-medium">Share</div>
        </div>
      </div>
    </div>
  );
};

export default CommentLikeShareDetail;
