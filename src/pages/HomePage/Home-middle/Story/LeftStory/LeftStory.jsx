import React from "react";
import { MdCancel } from "react-icons/md";
import { IoSettingsSharp, IoText } from "react-icons/io5";
import { useAuthContext } from "../../../../../context/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { backGroundImage } from "../../../../../util/background";
import { Link, useNavigate } from "react-router-dom";

const LeftStory = ({
  leftTextStr,
  setNameValueFont,
  createImage,
  cancel,
  setNameValueBg,
  setValueInput,
  setRunFunction,
  setButtonCreateImageText,
  setCancel,
  setLeftTextStr,
  setRightImageCrop,
}) => {
  const { authUser } = useAuthContext();
  const backgroundImages = backGroundImage();
  const navigate = useNavigate();
  const options = [
    {
      value: "1",
      label: (
        <div className="flex items-center h-[56px]">
          <IoText className="mr-2" />
          <span>Đơn giản</span>
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div className="flex items-center h-[56px]">
          <IoText className="mr-2" />
          <span>Gọn gàng</span>
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div className="flex items-center h-[56px]">
          <IoText className="mr-2" />
          <span>Bình thường</span>
        </div>
      ),
    },
    {
      value: "4",
      label: (
        <div className="flex items-center h-[56px]">
          <IoText className="mr-2" />
          <span>Kiểu cách</span>
        </div>
      ),
    },
    {
      value: "5",
      label: (
        <div className="flex items-center h-[56px]">
          <IoText className="mr-2" />
          <span>Tiên đề</span>
        </div>
      ),
    },
  ];

  const handleSelectBackGround = (id) => {
    setNameValueBg(id);
  };

  const handleOnChangeFont = (selectedOption) => {
    setNameValueFont(selectedOption.value);
  };

  const handleOnChangInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleChangeNoi = () => {
    setRunFunction(true);
  };

  const handleCancel = () => {
    setButtonCreateImageText(true);
    setRightImageCrop(false);
    setLeftTextStr(false);
    setCancel(false);
  };
  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  return (
    <div className="w-[360px] h-screen shadow-lg overflow-y-auto overflow-x-hidden">
      <div className="w-full h-[54px] flex mt-[4px] items-center">
        <div
          onClick={handleGoBack}
          className="ml-[15px] text-[#999999] text-5xl mr-1 cursor-pointer"
        >
          <MdCancel />
        </div>
        <Link to={"/"} className="w-[41px] h-[41px] cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            alt="Facebook Logo"
          />
        </Link>
      </div>
      <div className="w-full pt-[6px]">
        <div className="border-b border-gray-300 w-full"></div>
      </div>
      <div className="flex justify-between p-3">
        <div className="text-2xl font-bold">Tin của bạn</div>
        <div className="w-[41px] h-[41px] rounded-full bg-[#D8DADF] text-2xl flex items-center justify-center">
          <IoSettingsSharp />
        </div>
      </div>
      <div className="w-full flex items-center ml-3">
        <div className="w-[60px] h-[60px] rounded-full mr-3">
          <img
            className="flex w-[60px] h-[60px] rounded-full object-cover"
            src={authUser.user.avatar}
            alt="Avatar"
          />
        </div>
        <div className="text-xl font-bold">
          {authUser.user.firstName} {authUser.user.lastName}
        </div>
      </div>
      <div className="w-full pt-[6px] mt-3">
        <div className="border-b border-gray-300 w-full"></div>
      </div>

      {createImage && <div>hello</div>}
      {cancel && (
        <div className="w-[360px] items-center mt-[410px] h-[73px] fixed shadow-lg flex">
          <div
            onClick={handleCancel}
            className="font-medium w-[124px] ml-3 mr-2 h-[36px] cursor-pointer rounded-md bg-[#D8DADF] flex items-center justify-center"
          >
            Bỏ
          </div>
          <div
            className="bg-[#0861F2] font-medium text-white cursor-pointer w-[193px] h-[36px] rounded-md flex items-center justify-center"
            onClick={handleChangeNoi}
          >
            Chia sẻ lên tin
          </div>
        </div>
      )}
      {leftTextStr && (
        <div className="w-full h-full p-3">
          <Box
            sx={{
              color: "success.main",
            }}
            width={300}
            height={187}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              width={300}
              height={187}
              className="w-full h-[187px]"
              label="Bắt đầu nhập"
              variant="outlined"
              InputProps={{
                style: {
                  height: "187px",
                },
              }}
              onChange={(e) => handleOnChangInput(e)}
            />
          </Box>

          <div className="mt-3 h-[56px]">
            <Select
              onChange={handleOnChangeFont}
              className="h-[56px]"
              options={options}
              defaultValue={options[0]}
            />
          </div>
          <div className="mt-3 w-full border-2 p-2">
            <div>Phông nền</div>
            <div className="flex flex-wrap">
              {backgroundImages.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectBackGround(item.id)}
                  className="w-[25px] cursor-pointer h-[25px] rounded-full m-1"
                >
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftStory;
