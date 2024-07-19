import NameEmailDateTinderCreate from "./NameEmailDateTinderCreate/NameEmailDateTinderCreate";

const CreateAccount = () => {
  return (
    <div className="w-full bg-[#111418] flex justify-center">
      <div className="w-[901px]">
        <div className="font-bold text-4xl text-white w-full flex justify-center mt-[60px]">
          Tạo tài khoản
        </div>
        <NameEmailDateTinderCreate />
      </div>
    </div>
  );
};

export default CreateAccount;
