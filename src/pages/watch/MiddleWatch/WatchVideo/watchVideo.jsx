import { BsThreeDots } from "react-icons/bs";
import Video from "./../../Video";

const WatchVideo = () => {
  return (
    <div className="w-full bg-white mt-2">
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[49px] h-[49px] rounded-full">
            <img
              className="w-[49px] h-[49px] rounded-full object-cover"
              src="/src/assets/anh-dai-dien.jpg"
              alt="avt"
            />
          </div>
          <div>
            <div>Trâm anh 5 phút</div>
            <div className="flex">
              <div>25 tháng 3</div>
              <div>Công khai</div>
            </div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </div>
      <div>
        Tổng Hợp Những Pha Highlight Hay Nhất Liên Quân | TikTok Liên Quân
        Mobile 2024
      </div>
      <div className="w-full max-h-[437px]">
        <Video />
      </div>
      <div className="mt-3 h-[100px] w-full">1 lượt xem</div>
    </div>
  );
};

export default WatchVideo;
