import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { IoCamera } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../../redux/profile/avatarThunk";

const AvatarEditModal = ({ show, onHide }) => {
  const [img, setImg] = useState(null);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    setImg({
      file: file,
      url: URL.createObjectURL(file),
    });
  };

  const handleSave = () => {
    if (img) {
      dispatch(updateProfilePicture(img.file));
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chọn ảnh đại diện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          {img ? (
            <img
              src={img.url}
              alt="New Avatar"
              className="rounded-full w-[200px] h-[200px] object-cover"
            />
          ) : (
            <div
              className="w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <IoCamera className="text-4xl text-gray-400" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleOnChangeImage}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Hủy
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Lưu
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AvatarEditModal;
