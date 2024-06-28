import { useRef, useState } from "react";
import Send from "@mui/icons-material/Send";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CiFaceSmile } from "react-icons/ci";
import { usePostContext } from "../../../../../../context/PostContext";
import { axiosHaveAuth } from "../../../../../../util/axios";
import { useAuthContext } from "../../../../../../context/AuthContext";

const CommentPost = ({ postId }) => {
  const [commentsInput, setCommentsInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const instance = axiosHaveAuth();
  const { authUser } = useAuthContext();
  const {
    rootComments,
    setPostDetail,
    createLocalComment,
    postDetail,
    loading,
    error,
    comments,
  } = usePostContext();

  const handleTextareaChange = (e) => {
    setCommentsInput(e.target.value);
  };

  const handleCreateNewComment = async () => {
    if (commentsInput.trim() === "") return;

    try {
      const response = await instance.post("/api/new/commentPost", {
        message: commentsInput.toString(),
        postId: postId,
        userId: authUser.user._id,
      });

      if (response.data) {
        createLocalComment(response.data.metadata);
        setCommentsInput(""); // Clear the input field after creating a new comment
      }
    } catch (error) {
      console.error("Error creating new comment:", error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const textBeforeCursor = commentsInput.substring(0, cursorPosition);
    const textAfterCursor = commentsInput.substring(cursorPosition);

    const newText = textBeforeCursor + emoji.native + textAfterCursor;
    setCommentsInput(newText);

    // Reposition the cursor
    setTimeout(() => {
      textareaRef.current.selectionStart = cursorPosition + emoji.native.length;
      textareaRef.current.selectionEnd = cursorPosition + emoji.native.length;
      textareaRef.current.focus();
    }, 0);
  };

  return (
    <div>
      <div className="flex pl-[14px] pr-[11px] h-[76px] pt-[8px]">
        <div className="w-[33px] h-[33px] rounded-full">
          <img
            className="w-[33px] h-[33px] rounded-full object-cover"
            src={authUser.user.avatar}
            alt="avt"
          />
        </div>
        <div className="ml-2 w-[289px] pr-[17px] bg-[#F0F2F5] rounded-2xl">
          <textarea
            onChange={handleTextareaChange}
            className="w-full resize-none bg-transparent outline-none pt-2 pl-1 text-sm"
            placeholder="Viết bình luận..."
            value={commentsInput}
            ref={textareaRef}
          />
          <div className="h-[37px] flex w-[289px] p-2 justify-between absolute mt-[-40px]">
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
            <div className="text-lg" onClick={handleCreateNewComment}>
              {commentsInput ? (
                <Send style={{ color: "#1167C9" }} fontSize="small" />
              ) : (
                <Send style={{ color: "#C2C6CC" }} fontSize="small" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
