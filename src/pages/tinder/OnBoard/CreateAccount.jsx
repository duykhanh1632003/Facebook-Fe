import LikeCreateTinder from "../LikeCreateTinder/LikeCreateTinder";
import NameEmailDateTinderCreate from "./NameEmailDateTinderCreate/NameEmailDateTinderCreate";
import TendSex from "./TendSex/TendSex";

const CreateAccount = () => {
  return (
    <div className="w-full bg-[#111418] flex justify-center">
      <div className="w-[901px] h-full">
        <div className="font-bold text-4xl text-white w-full flex justify-center mt-[60px]">
          Tạo tài khoản
        </div>
        <NameEmailDateTinderCreate />
        <div className="flex items-center justify-center bg-[#111418]">
          <div className="w-[412px] h-[1px] bg-[#3C444F]"></div>
          <div className="w-[39px] h-[44px] ml-[20px] mr-[20px] text-white font-bold">
            Tùy chọn
          </div>
          <div className="w-[412px] h-[1px] bg-[#3C444F]"></div>
        </div>
        <LikeCreateTinder />
        <TendSex />
        <div className="w-ful justify-center flex mt-4">
          <div className="w-[147px] h-[67px] rounded-3xl bg-[#3C444F] text-[#656E7B] text-xl font-bold items-center justify-center flex">
            Tiếp tục
          </div>
        </div>
        <div className="h-[300px] "></div>
      </div>
    </div>
  );
};

export default CreateAccount;
