import { useRef, useState } from "react";
import { TiFolderAdd } from "react-icons/ti";
import { IoMdPhotos } from "react-icons/io";
import { IoText } from "react-icons/io5";
import bgLeft from "../../../../../assets/bg-left.png";
import bgRight from "../../../../../assets/bg-right.png";

const RightStoriesCreate = ({
  setCreatImage,
  createImage,
  buttonCreateImage,
  setButtonCreateImage,
  buttonCreateText,
  setButtonCreateText,
  setCancel,
}) => {
  const handleClick = () => {
    setCreatImage(!createImage);
  };
  const [img, setImg] = useState(null);

  const fileInputRef = useRef();
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
  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      });
      setButtonCreateImage(false);
      setButtonCreateText(false);
      setCancel(true);
    }
  };
  return (
    <div
      className="h-full w-full flex items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex">
        {buttonCreateImage && (
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-[219px] h-[331px] cursor-pointer bg-[url('/src/assets/bg-left.png')] pt-[136px] pl-[70px] mr-4 shadow-md rounded-lg"
          >
            <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-2xl ml-4 mb-2">
              <IoMdPhotos className="" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleOnChangeImage}
            />
            <div className="font-bold text-white">Tạo tin ảnh</div>
          </div>
        )}
        {buttonCreateText && (
          <div className="w-[219px] rounded-lg bg-[url('/src/assets/bg-right-new.png')] h-[331px] cursor-pointer pt-[136px] pl-[40px] mr-4 shadow-md">
            <div className="bg-white w-[50px] h-[50px]  rounded-full flex items-center justify-center text-2xl ml-10 mb-2">
              <IoText className="" />
            </div>
            <div className="font-bold text-white text-sm">
              Tạo tin dạng văn bản
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightStoriesCreate;
