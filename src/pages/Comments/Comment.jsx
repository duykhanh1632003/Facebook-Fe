import { useState, useRef } from "react";
import { usePostContext } from "../../context/PostContext";
import CommentList from "./CommentList";
import "./Comment.css"; // Import CSS for styling
import LikeIcon from "../../img/LikeIcon";
import Send from "@mui/icons-material/Send";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CiFaceSmile } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthContext";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { axiosHaveAuth } from "../../util/axios";
import { toast } from "react-toastify";
import { PiArrowBendDownRightFill } from "react-icons/pi";

const Comment = ({ _id, message, userId, likes, level = 0, postId }) => {
  const { getReplies, updateLocalComment, deleteLocalComment } =
    usePostContext();
  getReplies(_id);
  const [childComments, setChildComments] = useState(getReplies(_id));
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [liked, setLiked] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editInput, setEditInput] = useState(message);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const replyTextareaRef = useRef(null);
  const editTextareaRef = useRef(null);
  const { authUser } = useAuthContext();
  const instance = axiosHaveAuth();
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };
  const [showChildComments, setShowChildComments] = useState(false);

  const handleTextareaChange = (e) => {
    setReplyInput(e.target.value);
    replyTextareaRef.current.style.height = "auto";
    replyTextareaRef.current.style.height =
      replyTextareaRef.current.scrollHeight + "px";
  };

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (editInput.trim === "") return;
    try {
      const response = await instance.post("/api/edit/commentPost", {
        message: editInput,
        commentId: _id,
      });

      if (response) {
        updateLocalComment({ _id: _id, message: editInput });
        toast.success("Sửa comment thành công");
      }
    } catch (e) {
      console.error(e);
    }

    setEditing(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditComment = () => {
    setEditing(true);
    setShowDropdown(false);
  };

  const handlePostReply = async () => {
    if (replyInput.trim === "") return;
    try {
      const response = await instance.post("/api/new/commentPost", {
        message: replyInput,
        postId: postId,
        userId: authUser.user._id,
        parentId: _id,
      });

      if (response) {
        const childCommentNew = getReplies(_id);
        setChildComments(childCommentNew);
        console.log("check ", _id, editInput);
        updateLocalComment({ _id: _id, message: editInput });
        toast.success("Comment thành công");
      }
    } catch (e) {
      console.error(e);
    }
    setReplying(false);
  };

  const handleDeleteComment = async () => {
    try {
      const response = await instance.post("/api/delete/commentPost", {
        commentId: _id,
      });

      if (response) {
        deleteLocalComment(_id);
        toast.success("Xóa comment thành công");
      }
    } catch (e) {
      console.error(e);
    }
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

  const handleReplyEmojiSelect = (emoji) => {
    const cursorPosition = replyTextareaRef.current.selectionStart;
    const textBeforeCursor = replyInput.substring(0, cursorPosition);
    const textAfterCursor = replyInput.substring(cursorPosition);

    const newText = textBeforeCursor + emoji.native + textAfterCursor;
    setReplyInput(newText);

    // Reposition the cursor
    setTimeout(() => {
      replyTextareaRef.current.selectionStart =
        cursorPosition + emoji.native.length;
      replyTextareaRef.current.selectionEnd =
        cursorPosition + emoji.native.length;
      replyTextareaRef.current.focus();
    }, 0);
  };

  const handleEditEmojiSelect = (emoji) => {
    const cursorPosition = editTextareaRef.current.selectionStart;
    const textBeforeCursor = editInput.substring(0, cursorPosition);
    const textAfterCursor = editInput.substring(cursorPosition);

    const newText = textBeforeCursor + emoji.native + textAfterCursor;
    setEditInput(newText);

    // Reposition the cursor
    setTimeout(() => {
      editTextareaRef.current.selectionStart =
        cursorPosition + emoji.native.length;
      editTextareaRef.current.selectionEnd =
        cursorPosition + emoji.native.length;
      editTextareaRef.current.focus();
    }, 0);
  };

  const timeFromNow = (date) => {
    const now = moment();
    const postDate = moment(date);
    if (now.diff(postDate, "days") >= 7) {
      return postDate.format("MMM Do YYYY");
    }
    return postDate.fromNow();
  };

  return (
    <div className={`comment level-${level}`}>
      <div key={userId._id} className="comment-header relative z-4">
        <img
          src={userId.avatar} // Assuming user object has an avatar property
          alt={`${userId.firstName} ${userId.lastName}`}
          className="comment-avatar object-cover"
        />
        <div className="flex">
          <div className="comment-info dark:bg-[#3A3B3C]">
            <div className="comment-user">
              {userId.firstName} {userId.lastName}
            </div>
            {editing ? (
              <div className="edit-input-container">
                <textarea
                  ref={editTextareaRef}
                  className="edit-input"
                  value={editInput}
                  onChange={handleEditChange}
                />
                <div className="flex">
                  <div className="emoji-picker">
                    {showEditEmojiPicker && (
                      <div className="absolute mt-[-430px] ml-[-350px]">
                        <Picker
                          className="cursor-pointer"
                          data={data}
                          onEmojiSelect={handleEditEmojiSelect}
                        />
                      </div>
                    )}
                    <CiFaceSmile
                      className="cursor-pointer"
                      onClick={() =>
                        setShowEditEmojiPicker(!showEditEmojiPicker)
                      }
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
          <div className="absolute w-[354px] h-[-84px] mt-[40px] rounded-md ml-[-10px] z-3 shadow-xl  dark:bg-[#3A3B3C]  bg-white">
            <div className=" dark:bg-[#3A3B3C]  p-2 ">
              {" "}
              {authUser.user._id === userId._id ? (
                <>
                  <div
                    ư
                    className="w-full cursor-pointer h-1/2 p-2 font-medium  hover:bg-[#C2C6CC] dark:bg-[#3A3B3C]"
                    onClick={handleEditComment}
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    className="w-full cursor-pointer h-1/2 p-2 font-medium  hover:bg-[#C2C6CC] dark:bg-[#3A3B3C]"
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
        <div className="like flex dark:bg-[#3A3B3C] bg-white shadow-lg rounded-xl">
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
              className="w-[33px] h-[33px] rounded-full object-cover"
              src={authUser.user.avatar}
              alt="avatar"
            />
          </div>
          <div className="reply-input">
            <textarea
              ref={replyTextareaRef}
              onChange={handleTextareaChange}
              className="w-full resize-none bg-transparent outline-none pt-2 pl-1 text-sm"
              placeholder="Write a reply..."
              value={replyInput}
            />
            <div className="h-[37px] flex w-full p-2 justify-between absolute mt-[-40px]">
              <div className="text-lg">
                {showReplyEmojiPicker && (
                  <div className="absolute z-10 mt-[-460px] ml-[-70px]">
                    <Picker
                      data={data}
                      onEmojiSelect={handleReplyEmojiSelect}
                    />
                  </div>
                )}
                <CiFaceSmile
                  className="text-[#7B8289] font-medium mt-1 cursor-pointer"
                  onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)}
                />
              </div>
              <div className="text-lg">
                {replyInput ? (
                  <Send
                    onClick={handlePostReply}
                    style={{ color: "#1167C9" }}
                    fontSize="small"
                  />
                ) : (
                  <Send style={{ color: "#C2C6CC" }} fontSize="small" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {childComments.length > 0 && (
        <div className="child-comments">
          <div
            className="toggle-replies cursor-pointer"
            onClick={() => setShowChildComments(!showChildComments)}
          >
            {!showChildComments && (
              <div className="ml-12 flex text-sm font-medium text-[#6B6D71]">
                <div className="text-lg mr-2">
                  {" "}
                  <PiArrowBendDownRightFill />
                </div>
                <div> Xem tất cả {childComments.length} phản hồi </div>
              </div>
            )}{" "}
          </div>
          {showChildComments && (
            <CommentList
              comments={childComments}
              parentId={_id}
              postId={postId}
              level={level + 1}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
