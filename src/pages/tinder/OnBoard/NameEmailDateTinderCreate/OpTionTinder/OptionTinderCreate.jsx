import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

const OptionTinderCreate = () => {
  const [isDisplayProfile, setIsDisplayProfile] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searching, setSearching] = useState(null);

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleSelectInterest = (interest) => {
    setSelectedInterest(interest);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "modalBackdrop") {
      setShowModal(false);
    }
  };

  const handleSelectPurpose = (purpose) => {
    setSearching(purpose === searching ? null : purpose);
  };

  return (
    <div className="w-[511px]">
      <div className="w-[511px]">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Giới tính
        </label>
        <div className="w-[511px] flex text-white">
          <button
            className={`px-4 mr-2 w-[164px] py-2 border-[2px]  ${
              selectedGender === "Nam" ? "border-red-500" : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold`}
            onClick={() => handleSelectGender("Nam")}
          >
            Nam
          </button>
          <button
            className={`px-4 mr-2 w-[164px] py-2 border-[2px] -[2px]  ${
              selectedGender === "Nữ" ? "border-red-500" : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold`}
            onClick={() => handleSelectGender("Nữ")}
          >
            Nữ
          </button>
          <button
            className={`px-4 w-[164px] py-2 border-[2px]  ${
              selectedGender === "Cả hai" ? "border-red-500" : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground flex items-center justify-center font-bold`}
            onClick={() => handleSelectGender("Cả hai")}
          >
            Cả hai
          </button>
        </div>
        <div className="flex mt-3 text-white">
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
      </div>
      <div className="w-[511px]">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Quan tâm hồ sơ của
        </label>
        <div className="w-[511px] flex text-white">
          <button
            className={`px-4 mr-2 w-[164px] py-2 border-[2px]  ${
              selectedInterest === "Nam" ? "border-red-500" : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold`}
            onClick={() => handleSelectInterest("Nam")}
          >
            Nam
          </button>
          <button
            className={`px-4 mr-2 w-[164px] py-2 border-[2px]  ${
              selectedInterest === "Nữ" ? "border-red-500" : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold`}
            onClick={() => handleSelectInterest("Nữ")}
          >
            Nữ
          </button>
          <button
            className={`px-4 w-[164px] py-2 border-[2px]  ${
              selectedInterest === "Mọi người"
                ? "border-red-500"
                : "border-border"
            } text-foreground rounded-full hover:bg-muted hover:text-muted-foreground flex items-center justify-center font-bold`}
            onClick={() => handleSelectInterest("Mọi người")}
          >
            Mọi người
          </button>
        </div>
      </div>

      <div className="w-[511px] text-white">
        <label
          htmlFor="name"
          className="block text-foreground font-semibold  text-white mt-2 mb-2"
        >
          Đang tìm kiếm
        </label>
        {searching ? (
          <button
            className="px-4 mr-2 w-[250px] flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold"
            onClick={handleModalOpen}
          >
            <span className="flex font-bold items-center justify-center mr-2 text-white">
              <BsPencilFill />
            </span>
            <div>Sửa mục đích hẹn hò </div>
          </button>
        ) : (
          <button
            className="px-4 mr-2 w-[250px] flex items-center justify-center py-2 border border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold flex"
            onClick={handleModalOpen}
          >
            <span className="flex items-center justify-center mr-2 text-[#B9BFC8]">
              <IoMdAdd />
            </span>
            <div>Thêm mục đích hẹn hò </div>
          </button>
        )}
        {searching && (
          <div className=" flex w-[250px] rounded-3xl items-center justify-center mt-3 border-red-600 border-[2px] ">
            {searching}
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        dialogClassName="modal-532-449"
        id="modalBackdrop"
        onClick={handleOutsideClick}
      >
        <Modal.Body className="bg-[#111418] rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-2xl text-white mb-4">
              Bạn đang tìm kiếm điều gì?
            </div>
            <div className="text-white ">
              Nếu bạn thay đổi suy nghĩ thì cũng không sao.
            </div>
            <div className="text-white mb-6">
              Sẽ luôn có ai đó phù hợp với mục đích của bạn.
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Người yêu",
                "Bạn hẹn hò lâu dài",
                "Bất kì điều gì có thể",
                "Quan hệ không ràng buộc",
                "Những người bạn mới",
                "Mình cũng chưa rõ lắm",
              ].map((option, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-center w-[200px] h-[100px] rounded-lg border ${
                    searching === option ? "border-red-500" : "border-gray-500"
                  } text-white`}
                  onClick={() => handleSelectPurpose(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                className={`w-[200px] h-[50px] rounded-full ${
                  searching ? "bg-orange-500" : "bg-gray-500"
                } text-white font-bold`}
                onClick={handleModalClose}
                disabled={!searching}
              >
                Lưu
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OptionTinderCreate;
