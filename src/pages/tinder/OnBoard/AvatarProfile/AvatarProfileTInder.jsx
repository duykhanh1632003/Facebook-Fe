import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { IoMdAdd } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { getCroppedImg } from "./cropImage"; // A helper function to get the cropped image
import "./AvatarProfileTiner.css";
import { FaRotate } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTinderContext } from "../../../../context/TinderContext";

const AvatarProfileTInder = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { images, setImages } = useTinderContext();
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
    setImages([...images, croppedImage]);
    setShowModal(false);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div>
      <div className="font-medium text-white">Ảnh hồ sơ</div>
      <div className="flex w-[380px] flex-wrap">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={
              !images[index]
                ? "relative dashed rounded-lg ml-2 mb-3 w-1/4 h-32 flex items-center justify-center cursor-pointer"
                : "relative rounded-lg ml-2 mb-3 w-1/4 h-32 flex items-center justify-center cursor-pointer"
            }
            onClick={!images[index] ? handleClick : undefined}
          >
            {images[index] ? (
              <>
                <img
                  src={images[index]}
                  alt={`avatar-${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute mt-[120px] ml-[80px] w-[29px] h-[29px] bg-gradient-to-r bg-white border-[1px] border-b-light-2 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <span className="text-[#7C8591] text-2xl flex items-center justify-center font-semibold">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
              </>
            ) : (
              <div className="absolute mt-[120px] ml-[80px] w-[29px] h-[29px] bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white text-2xl flex items-center justify-center font-bold">
                  <IoMdAdd />
                </span>
              </div>
            )}
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
        <Modal.Body className="bg-[#111418] rounded-lg">
          <div className="flex ">
            <div className="font-bold text-2xl text-white w-full items-center justify-center ml-[130px] mb-3  ">
              Chỉnh sửa Ảnh
            </div>
          </div>
          <div className="relative w-[303px] h-[340px] bg-black mx-auto rounded-lg">
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
              className="slider"
              id="myRange"
            />

            <button
              className="text-white border-light-1 border-[1px] p-2 rounded-full hover:border-orange-500 hover:text-orange-500"
              onClick={() => setRotation((prev) => prev + 90)}
            >
              <FaRotate className="hover:text-orange-500" />
            </button>
          </div>
          <div className="ml-[90px]">
            <button
              className="w-[302px] h-[53px] bg-[#FE5048] rounded-3xl font-bold text-xl text-white mt-4"
              onClick={handleCrop}
            >
              Chọn
            </button>
            <button
              className="w-[302px] h-[53px]  rounded-3xl font-bold text-xl text-white mt-2 hover:bg-[#272626]"
              onClick={() => setShowModal(false)}
            >
              Hủy
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AvatarProfileTInder;
