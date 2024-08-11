import React, { useState, useEffect } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { axiosHaveAuth } from "../../../../../../../util/axios";

const BioGraphy = ({ userId }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const maxWords = 100;
  const instance = axiosHaveAuth();
  const [biography, setBiography] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= maxWords) {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        const response = await instance.get(`/api/get/biography/${userId}`);
        console.log("Check data", response);
        setBiography(response.data.metadata.biography);
        setText(response.data.metadata.biography);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBiography();
  }, [userId]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCancel = () => {
    setText(biography);
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      await instance.post(`/api/save/biography/${userId}`, {
        biography: text,
      });
      setBiography(text);
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full mt-2">
      {/* Div hiển thị tiểu sử */}
      {!isOpen && biography && (
        <div className="w-full mb-2 rounded-lg text-center">{biography}</div>
      )}
      {isOpen ? (
        <div className="w-full">
          <div
            className={`w-full p-3 bg-[#F0F2F5] rounded-lg relative border-2 ${
              isFocused ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <textarea
              className={`w-full bg-[#F0F2F5] h-24 p-2 resize-none border-0 rounded-lg outline-none text-center`}
              placeholder="Mô tả về bạn"
              value={text}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ overflow: "hidden", whiteSpace: "pre-wrap" }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-gray-600">
              <FaGlobeAmericas className="mr-2" />
              <span>Công khai</span>
            </div>
            <div className="text-gray-400">
              Còn {maxWords - text.length} ký tự
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-200 text-black py-1 px-4 rounded-md mr-2"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="w-full h-[36px] rounded-md bg-[#E4E6EB] flex items-center justify-center font-medium cursor-pointer"
        >
          Chỉnh sửa tiểu sử
        </div>
      )}
    </div>
  );
};

export default BioGraphy;
