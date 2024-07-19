import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const LikeCreateTinder = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const interests = [
    "Thế Hệ 9x",
    "Harry Potter",
    "SoundCloud",
    "Spa",
    "Chăm sóc bản thân",
    "Heavy Metal",
    "Tiệc gia đình",
    "Gin Tonic",
    "Thể dục dụng cụ",
    "Hot Yoga",
    "Thiền",
    "Sushi",
    "Spotify",
    "Hockey",
    "Bóng rổ",
    "Đấu thơ",
    "Tập luyện tại nhà",
    "Nhà hát",
    "Trải nghiệm các quán cà phê",
    "Thủy cung",
    "Giày Sneaker",
    "Instagram",
    "Suối nước nóng",
    "Đi dạo",
    "Chạy bộ",
    "Du lịch",
    "Giao lưu ngôn ngữ",
    "Phim ảnh",
    "Chơi guitar",
    "Phát triển xã hội",
    "Tập gym",
    "Mạng Xã hội",
    "Hip Hop",
    "Chăm sóc da",
    "J-Pop",
    "Shisha",
    "Cricket",
    "Phim truyền hình Hàn Quốc",
    "Làm việc tự do",
    "K-Pop",
    "Trượt ván",
    "Gospel",
    "Group X",
    "Potterhead",
    "Thử những thứ mới",
    "Nhiếp ảnh",
    "Bollywood",
    "Đọc sách",
    "Hát",
    "Thể thao",
    "Thơ",
  ];

  const handleSelectInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="w-[422px] text-white mt-4">
      <div className="text-md font-bold mb-2">Sở thích</div>

      {selectedInterests.length > 0 ? (
        <button
          className="px-4 mr-2 w-[250px] flex items-center justify-center py-2 border-[2px]  border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold"
          onClick={handleModalOpen}
        >
          <span className="flex font-bold items-center justify-center mr-2 text-white">
            <BsPencilFill />
          </span>
          <div>Sửa mục sở thích</div>
        </button>
      ) : (
        <button
          className="px-4 mr-2 w-[250px] flex items-center justify-center py-2 border-[2px]  border-border text-foreground rounded-full hover:bg-muted hover:text-muted-foreground font-bold flex"
          onClick={handleModalOpen}
        >
          <span className="flex items-center justify-center mr-2 text-[#B9BFC8]">
            <IoMdAdd />
          </span>
          <div>Thêm sở thích</div>
        </button>
      )}
      <div className="flex flex-wrap rounded-3xl items-center justify-start mt-3   p-2">
        {selectedInterests.map((interest, index) => (
          <div
            key={index}
            className="bg-red-600 text-white px-2 py-1 m-1 rounded-full cursor-pointer"
            onClick={() => handleSelectInterest(interest)}
          >
            {interest} <FaTimes className="inline" />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body className="bg-[#111418] text-white w-[643px]">
          <div className="w-full flex items-center justify-center font-bold text-2xl mb-2">
            Bạn thích điều gì?
          </div>
          <div className="text-sm w-full flex items-center justify-center mb-3">
            Bạn có những sở thích của mình. Giờ hãy cho mọi người cùng biết nhé
          </div>
          <div className="d-flex flex-wrap max-h-[404px] overflow-y-auto hide-scrollbar bg-[#111418] text-white">
            {interests.map((interest, index) => (
              <button
                key={index}
                className={`px-4 py-2 m-1 rounded-full border-[2px]  ${
                  selectedInterests.includes(interest)
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelectInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="w-full mt-2 flex justify-center">
            <button
              className=" font-bold  flex items-center justify-center h-[50px] w-[202px] rounded-3xl bg-[#EA4E42]"
              onClick={handleModalClose}
              disabled={selectedInterests.length === 0}
            >
              Lưu ({selectedInterests.length}/5)
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LikeCreateTinder;
