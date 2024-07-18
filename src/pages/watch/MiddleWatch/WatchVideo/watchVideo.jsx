import { BsThreeDots } from "react-icons/bs";
import Video from "./../../Video";

const WatchVideo = () => {
  return (
    <div className="w-full bg-white mt-2">
      <div className="flex justify-between">
        <div className="flex items-center px-2 py-2">
          <div className="w-[49px] h-[49px] rounded-full">
            <img
              className="w-[49px] h-[49px] rounded-full object-cover"
              src="/src/assets/anh-dai-dien.jpg"
              alt="avt"
            />
          </div>
          <div>
            <div className="ml-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                45 BLACK
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Hôm qua lúc 17:41
              </div>
            </div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </div>
      <div className="px-2 font-bold">
        <p className="text-sm text-zinc-900 dark:text-zinc-100">
          Raze Is A Broken Agent
        </p>
        <p className="text-sm text-zinc-900 dark:text-zinc-100">
          Raze Is A Broken Agent
          <a href="#" className="text-blue-500 dark:text-blue-400">
            Xem thêm
          </a>
        </p>
      </div>
      <div className="w-full max-h-[437px]">
        <Video />
      </div>
      <div className="mt-3 h-[100px] w-full">1 lượt xem</div>
    </div>
  );
};

export default WatchVideo;
