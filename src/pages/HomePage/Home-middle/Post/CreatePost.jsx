import Modal from "react-bootstrap/Modal";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import "./CreatePost.css";
import { useState, useRef, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { TiFolderAdd } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../../../redux/post/postsThunks";
import { useAuthContext } from "../../../../context/AuthContext";
import classNames from "classnames";

const CreatePost = ({ show, onHide, setModalShow }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [img, setImg] = useState(null);
  const fileInputRef = useRef();
  const [isOpenAddImage, setIsOpenAddImage] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (img) {
      setIsOpenAddImage(false);
      setIsOpenImage(true);
      setIsOpenCancel(true);
    } else {
      setIsOpenImage(false);
      setIsOpenCancel(false);
    }
  }, [img]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setCursor(e.target.selectionStart);
  };

  const onEmojiClick = (emoji) => {
    const newInputValue =
      inputValue.substring(0, cursor) +
      emoji.native +
      inputValue.substring(cursor);
    setInputValue(newInputValue);
    setCursor(cursor + emoji.native.length);
  };

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleCancel = () => {
    setImg(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setInputValue(inputValue + "\n");
    }
  };

  const handleOnChangePostPhoto = () => {
    setIsOpenAddImage(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImg({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNewPost = () => {
    dispatch(
      createNewPost({
        inputValue,
        img,
        setImg,
        setInputValue,
        setModalShow,
        authUser,
      })
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="ml-[160px] flex text-xl font-semibold">
          Tạo bài viết
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-[#FFFFFF] flex flex-col">
          <div className="flex">
            <div className="rounded-full h-[42px] w-[42px] mr-[11px]">
              <img
                className="rounded-full object-cover h-full w-full"
                src={authUser.user.avatar}
                alt="Avatar"
              />
            </div>
            <div className="h-full">
              <div className="text-sm font-medium">
                {authUser.user.firstName} {authUser.user.lastName}
              </div>
              <div className="rounded-lg h-[23px] bg-[#E4E6EB] flex items-center text-xs justify-center cursor-pointer font-semibold mb-[16px]">
                <FaEarthAmericas className="text-xs" />
                <div className="text-xs ml-[3px] mr-[3px]">Công khai</div>
                <FaCaretDown className="text-xs" />
              </div>
            </div>
          </div>
          <div
            className="parent"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <textarea
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder={`${authUser.user.lastName} ơi bạn đang nghĩ gì thế?`}
              className="w-full bg-transparent outline-none resize-none text-sm input-textarea"
              cols="30"
              rows="2"
            ></textarea>
            <div className="emoji-color">
              <div className="w-[34px] h-[34px] cursor-pointer">
                <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" />
              </div>
              <div className="w-[23px] h-[24px] cursor-pointer">
                <BsEmojiSmile
                  className="w-[23px] h-[23px]"
                  onClick={() => {
                    setIsOpenEmoji(!isOpenEmoji);
                  }}
                />
                {isOpenEmoji && (
                  <div className="emoji">
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      onEmojiSelect={onEmojiClick}
                      maxFrequentRows={0}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOpenCancel && (
            <div className="cancel" onClick={handleCancel}>
              <MdOutlineCancel />
            </div>
          )}
          {isOpenAddImage && !isOpenImage && (
            <div
              className="create-image"
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="create-image-child">
                <div className="add-button">
                  <div className="icon-tifolder text-2xl">
                    <TiFolderAdd className="TiFolderAdd" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleOnChangeImage}
                  />
                  <div className="add-image">Thêm ảnh/video</div>
                  <div className="pull-image">hoặc kéo và thả</div>
                </div>
              </div>
            </div>
          )}
          {!isOpenAddImage && isOpenImage && img && (
            <div className="create-image">
              <img
                className="create-image-image"
                src={img.url}
                alt={img.name}
              />
            </div>
          )}
          <div className="add-post">
            <div className="add-post-text">Thêm vào bài viết của bạn</div>
            <div className="add-post-photo" onClick={handleOnChangePostPhoto}>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeGWfZPpqbXYHP17Ocs9DLBFPL4YoeGsw5I8vhih4azDkhAkC4jdJ23lJMF0dIdq-M-BquWZr_E3FXEdZjDyG2DD" />
            </div>
          </div>
          <div
            onClick={handleNewPost}
            className={classNames({
              "bottom-post-color": inputValue !== "" || img !== null,
              "bottom-post-not-color": inputValue === "" && img === null,
            })}
          >
            Đăng
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePost;
