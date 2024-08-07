import { IoMdPhotos } from "react-icons/io";
import { IoText } from "react-icons/io5";
import AvatarEditor from "react-avatar-editor";
import { AiOutlineRotateRight } from "react-icons/ai";
import { backGroundImageStr } from "../../../../../util/background";
import { fontFamily } from "./../../../../../util/background";
import { useStoriesContext } from "../../../../../context/StoriesContext";

const RightStoriesCreate = () => {
  const {
    createImage,
    setCreatImage,
    buttonCreateImageText,
    setButtonCreateImageText,
    rightImageCrop,
    setRightImageCrop,
    setCancel,
    nameValueBg,
    nameValueFont,
    valueInput,
    leftTextStr,
    setLeftTextStr,

    img,
    setImg,
    scale,
    setScale,
    rotate,
    setRotate,
    fileInputRef,
    editorRef,
  } = useStoriesContext();

  const handleDrop = (e) => {
    e.preventDefault();
    setButtonCreateImageText(false);
    setRightImageCrop(true);
    setCancel(true);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImg({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleClick = () => {
    setCreatImage(!createImage);
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
      setRightImageCrop(true);
      setButtonCreateImageText(false);
      setCancel(true);
    }
  };

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const handleRotate = () => {
    setRotate((prevRotate) => prevRotate + 90);
  };

  const handleOnCreateImageText = () => {
    setButtonCreateImageText(false);
    setLeftTextStr(true);
    setCancel(true);
  };

  const backGroundImageStrs = backGroundImageStr();
  const fontFamilys = fontFamily();
  return (
    <div
      className="h-full w-full flex items-center justify-center bg-[#F0F2F5]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div></div>
      <div className="flex">
        {buttonCreateImageText && (
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-[219px] h-[331px] cursor-pointer bg-[url('/src/assets/bg-left.png')] pt-[136px] pl-[70px] mr-4 shadow-md rounded-lg"
          >
            <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-2xl ml-4 mb-2">
              <IoMdPhotos />
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
        {buttonCreateImageText && (
          <div
            onClick={handleOnCreateImageText}
            className="w-[219px] rounded-lg bg-[url('/src/assets/bg-right-new.png')] h-[331px] cursor-pointer pt-[136px] pl-[40px] mr-4 shadow-md"
          >
            <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-2xl ml-10 mb-2">
              <IoText />
            </div>
            <div className="font-bold text-white text-sm">
              Tạo tin dạng văn bản
            </div>
          </div>
        )}
      </div>
      {rightImageCrop && (
        <div className="w-[1100px] h-[650px] rounded-lg bg-white items-center justify-center shadow-2xl p-4">
          <div className="font-bold text-sm mb-2">Xem trước</div>
          <div className="container ml-9">
            <div className="crop-box">
              {img && (
                <AvatarEditor
                  ref={editorRef}
                  image={img.url}
                  width={266}
                  height={479}
                  border={[400, 50, 400, 50]}
                  color={[0, 0, 0, 0.6]} // RGBA
                  scale={scale}
                  rotate={rotate}
                  borderRadius={10}
                  backgroundColor={[255, 255, 255]}
                  style={{
                    maxWidth: "942px",
                    maxHeight: "549px",
                    backgroundColor: "black",
                  }}
                />
              )}
            </div>
          </div>

          <div className="ml-[400px] flex mt-2">
            <input
              type="range"
              min="1"
              max="3.54"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
            <div
              className="ml-2 Sh-[50px] w-[80px] bg-black rounded-lg items-center flex justify-center font-bold text-white cursor-pointer "
              onClick={handleRotate}
            >
              <AiOutlineRotateRight className="mr-1" />
              Xoay
            </div>
          </div>
        </div>
      )}
      {leftTextStr && (
        <div>
          <div className="w-[974px] h-[616px] rounded-lg shadow-2xl bg-[#FFFFFF] p-3">
            <div className="font-bold">Xem trước</div>
            <div className="w-[939px] h-[584px] rounded-lg flex items-center justify-center bg-[#18191A]">
              {nameValueBg === 1 ? (
                <div
                  className="h-[525px] items-center justify-center flex w-[294px] rounded-lg z-2 font-bold text-xl text-[#FFFFFF] p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgb(84, 150, 255) 0%, rgb(5, 72, 179) 100%)",
                  }}
                >
                  {!valueInput ? (
                    <div className="text-[#92B4E9] text-2xl">Bắt đầu nhập</div>
                  ) : (
                    <div
                      className="h-[525px] items-center justify-center flex w-[294px]"
                      style={{
                        fontFamily: `${
                          fontFamilys[nameValueFont - 1].fontFamily
                        }`,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {valueInput}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="h-[525px] items-center justify-center flex w-[294px] rounded-lg z-2 font-bold text-xl text-[#FFFFFF] p-4"
                  style={{
                    backgroundImage: `${
                      backGroundImageStrs[nameValueBg - 1].image
                    }`,
                    color: `${backGroundImageStrs[nameValueBg - 1].color}`,
                  }}
                >
                  {!valueInput ? (
                    <div className="text-[#92B4E9] text-2xl">Bắt đầu nhập</div>
                  ) : (
                    <div
                      className="h-[525px] items-center justify-center flex w-[294px] p-4"
                      style={{
                        fontFamily: `${
                          fontFamilys[nameValueFont - 1].fontFamily
                        }`,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {valueInput}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightStoriesCreate;
