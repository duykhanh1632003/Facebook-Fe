import NameEmailDateTinderCreate from "./NameEmailDateTinderCreate/NameEmailDateTinderCreate";

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
        <div className="h-[300px] "></div>
      </div>
    </div>
  );
};

export default CreateAccount;
