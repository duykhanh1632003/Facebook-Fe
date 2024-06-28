import React, { useState, useRef, useEffect } from "react";
import { usePostContext } from "../../context/PostContext";
import CommentList from "./CommentList";
import "./Comment.css"; // Import CSS for styling
import LikeIcon from "../../img/likeIcon";
import Send from "@mui/icons-material/Send";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CiFaceSmile } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthContext";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";

const Comment = ({ id, message, userId, likes, level = 0 }) => {
  const { getReplies } = usePostContext();
  const childComments = getReplies(id);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [liked, setLiked] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editInput, setEditInput] = useState(message);
  const [showDropdown, setShowDropdown] = useState(false);
  const textareaRef = useRef(null);
  const { authUser } = useAuthContext();

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };

  const handleTextareaChange = (e) => {
    setReplyInput(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const timeFromNow = (date) => {
    const now = moment();
    const postDate = moment(date);
    if (now.diff(postDate, "days") >= 7) {
      return postDate.format("MMM Do YYYY");
    }
    return postDate.fromNow();
  };

  const handleEmojiSelect = (emoji) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const textBeforeCursor = replyInput.substring(0, cursorPosition);
    const textAfterCursor = replyInput.substring(cursorPosition);

    const newText = textBeforeCursor + emoji.native + textAfterCursor;
    setReplyInput(newText);

    // Reposition the cursor
    setTimeout(() => {
      textareaRef.current.selectionStart = cursorPosition + emoji.native.length;
      textareaRef.current.selectionEnd = cursorPosition + emoji.native.length;
      textareaRef.current.focus();
    }, 0);
  };

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditSubmit = () => {
    // Logic for submitting the edited comment
    setEditing(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditComment = () => {
    setEditing(true);
    setShowDropdown(false);
  };

  const handleDeleteComment = () => {
    // Logic for deleting comment
    setShowDropdown(false);
  };

  const handleHideComment = () => {
    // Logic for hiding comment
    setShowDropdown(false);
  };

  const handleReportComment = () => {
    // Logic for reporting comment
    setShowDropdown(false);
  };

  return (
    <div className={`comment level-${level}`}>
      <div key={userId._id} className="comment-header">
        <img
          src={userId.avatar} // Assuming user object has an avatar property
          alt={`${userId.firstName} ${userId.lastName}`}
          className="comment-avatar object-cover"
        />
        <div className="flex ">
          <div className="comment-info">
            <div className="comment-user">
              {userId.firstName} {userId.lastName}
            </div>
            {editing ? (
              <div className="edit-input-container">
                <textarea
                  className="edit-input"
                  value={editInput}
                  onChange={handleEditChange}
                />
                <div className="flex ">
                  {" "}
                  <div className="emoji-picker">
                    {showEmojiPicker && (
                      <div className="absolute mt-[-430px] ml-[-350px]">
                        {" "}
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                      </div>
                    )}
                    <CiFaceSmile
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                  </div>
                  <Send onClick={handleEditSubmit} />
                </div>
              </div>
            ) : (
              <div className="comment-message">{message}</div>
            )}
          </div>
          <div
            className="w-[24px] h-[24px] cursor-pointer rounded-full hover:bg-[#C2C6CC] flex items-center ml-2 justify-center mt-[20px]"
            onClick={toggleDropdown}
          >
            <BsThreeDots />
          </div>
        </div>
        {showDropdown && (
          <div className="absolute w-[354px] h-[84px] mt-[40px] rounded-md ml-[-147px] z-3 shadow-xl bg-white p-2">
            {authUser.id === userId.id ? (
              <>
                <div
                  className="w-full cursor-pointer  h-1/2 p-2 font-medium rounded-md hover:bg-[#C2C6CC]"
                  onClick={handleEditComment}
                >
                  Chỉnh sửa
                </div>
                <div
                  className="w-full cursor-pointer h-1/2 p-2 font-medium rounded-md hover:bg-[#C2C6CC]"
                  onClick={handleDeleteComment}
                >
                  Xóa
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-full cursor-pointer h-1/2 p-2 font-medium rounded-md hover:bg-[#C2C6CC]"
                  onClick={handleHideComment}
                >
                  Ẩn bình luận
                </div>
                <div
                  className="w-full cursor-pointer h-1/2 p-2 font-medium rounded-md hover:bg-[#C2C6CC]"
                  onClick={handleReportComment}
                >
                  Báo cáo bình luận
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="comment-actions">
        <span className="comment-time">{timeFromNow(userId.createdAt)}</span>

        <span
          className={`comment-action ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          Like
        </span>
        <span className="comment-action" onClick={() => setReplying(!replying)}>
          Reply
        </span>
        <div className="like flex bg-white shadow-lg rounded-xl">
          {likeCount > 0 && (
            <div className="flex text-sm">
              <span className="comment-likes mr-1">{likeCount}</span>
              <div className="w-[19px] h-[19px] rounded-full mr-1 mt-[1px]">
                <LikeIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      {replying && (
        <div className={`reply-input-container level-${level + 1}`}>
          <div className="reply-avatar">
            <img
              className="w-[33px] h-[33px] rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
              alt="avatar"
            />
          </div>
          <div className="reply-input">
            <textarea
              ref={textareaRef}
              onChange={handleTextareaChange}
              className="w-full resize-none bg-transparent outline-none pt-2 pl-1 text-sm"
              placeholder="Write a reply..."
              value={replyInput}
            />
            <div className="h-[37px] flex w-full p-2 justify-between absolute mt-[-40px]">
              <div className="text-lg">
                {showEmojiPicker && (
                  <div className="absolute z-10 mt-[-460px] ml-[-70px]">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
                <CiFaceSmile
                  className="text-[#7B8289] font-medium mt-1 cursor-pointer"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
              </div>
              <div className="text-lg">
                <div className="text-lg">
                  {replyInput ? (
                    <Send style={{ color: "#1167C9" }} fontSize="small" />
                  ) : (
                    <Send style={{ color: "#C2C6CC" }} fontSize="small" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {childComments?.length > 0 && (
        <div className="child-comments">
          <CommentList comments={childComments} level={level + 1} />
        </div>
      )}
    </div>
  );
};

export default Comment;
