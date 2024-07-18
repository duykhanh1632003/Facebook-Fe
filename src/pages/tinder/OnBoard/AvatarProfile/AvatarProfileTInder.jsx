import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { IoMdAdd } from "react-icons/io";
import { MdRotateRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { getCroppedImg } from "./cropImage"; // A helper function to get the cropped image
import "./AvatarProfileTiner.css";

const AvatarProfileTInder = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setShowModal(true);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation
    );
    console.log(croppedImage);
    setShowModal(false);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div className="font-medium text-white">Ảnh hồ sơ</div>
      <div className="flex w-[380px] flex-wrap">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative dashed rounded-lg ml-2 mb-3 w-1/4 h-32 flex items-center justify-center"
            onClick={handleClick}
          >
            <div className="absolute mt-[120px] ml-[80px] w-[29px] h-[29px] bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white text-2xl flex items-center justify-center font-bold">
                <IoMdAdd />
              </span>
            </div>
          </div>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Chỉnh sửa Ảnh</Modal.Title>
          <Button variant="close" onClick={() => setShowModal(false)}>
            <AiOutlineClose size={24} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="relative w-[303px] h-[340px] bg-black mx-auto">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={254 / 313}
              rotation={rotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              cropSize={{ width: 254, height: 313 }}
            />
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className="w-1/2"
            />
            <Button
              variant="outline-light"
              onClick={() => setRotation((prev) => prev + 90)}
            >
              <MdRotateRight size={24} />
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCrop}>
            Chọn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarProfileTInder;
