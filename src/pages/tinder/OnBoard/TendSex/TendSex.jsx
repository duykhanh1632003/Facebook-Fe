import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TendSex.css";
import { optionTinder } from "../../../../util/tinder";
import { useTinderContext } from "../../../../context/TinderContext";
const TendSex = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDisplayProfile, setIsDisplayProfile] = useState(false);
  const { selectedOptions, setSelectedOptions } = useTinderContext();
  const options = optionTinder();

  const handleSelectOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="w-[422px] text-white">
      <div className="text-md font-bold mb-2">KHUYNH HƯỚNG TÍNH DỤC</div>
      {selectedOptions.length > 0 ? (
        <button
          className="px-4 mr-2 w-[300px] flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold"
          onClick={handleModalOpen}
        >
          <span className="flex font-bold items-center justify-center mr-2 text-white">
            <BsPencilFill />
          </span>
          <div>Sửa Khuynh Hướng Tính Dục</div>
        </button>
      ) : (
        <button
          className="px-4 mr-2 w-[350px] flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold "
          onClick={handleModalOpen}
        >
          <span className="flex items-center justify-center mr-2 text-[#B9BFC8]">
            <IoMdAdd />
          </span>
          <div>Thêm Khuynh Hướng Tính Dục</div>
        </button>
      )}

      <div className="flex flex-wrap rounded-3xl items-center justify-start mt-3 p-2">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="bg-red-600 text-white px-2 py-1 m-1 rounded-full cursor-pointer"
            onClick={() => handleSelectOption(option)}
          >
            {option} <FaTimes className="inline" />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body className="bg-[#111418] text-white">
          <Modal.Title>Khuynh hướng tính dục của bạn?</Modal.Title>

          <div className="text-center mb-4">Chọn tối đa 3</div>
          <div className="d-flex flex-column overflow-y-auto max-h-[378px] overflow-x-hidden hide-scrollbar">
            {options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left py-2 px-3 m-1 rounded ${
                  selectedOptions.includes(option)
                    ? " text-white font-bold text-lg"
                    : " text-white"
                }`}
                onClick={() => handleSelectOption(option)}
              >
                {option}{" "}
                {selectedOptions.includes(option) && (
                  <FaCheck className=" text-orange-600 float-right" />
                )}
                <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
              </button>
            ))}
          </div>
          <div className="flex mt-3 text-white w-full justify-center ">
            {isDisplayProfile ? (
              <div
                onClick={() => setIsDisplayProfile(!isDisplayProfile)}
                className="w-[25px] h-[25px] rounded-lg border-[1px] border-gray-500 mr-2 cursor-pointer"
              ></div>
            ) : (
              <div
                onClick={() => setIsDisplayProfile(!isDisplayProfile)}
                className="w-[25px] h-[25px] rounded-lg font-semibold flex items-center justify-center cursor-pointer  bg-[#FD6071] mr-2"
              >
                <FaCheck />
              </div>
            )}
            <div>Hiển thị giới tính trên hồ sơ của tôi</div>
          </div>
          <button
            className="h-[50px] bg-[#FD6071] w-full rounded-3xl mt-3"
            onClick={handleModalClose}
            disabled={selectedOptions.length === 0}
          >
            Lưu
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TendSex;
