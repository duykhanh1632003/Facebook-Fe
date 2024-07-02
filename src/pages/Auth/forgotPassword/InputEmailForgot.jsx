import { useState } from "react";
import Separate from "../../../components/Separate";
import { axiosNotHaveAuth } from "../../../util/axios";

const InputEmailForgot = ({ OTP, setOTP, setEmailLayout, email, setEmail }) => {
  const handleSearchEmail = async () => {
    if (email) {
      try {
        console.log("check email", email);
        const body = { email };
        const gmail = await axiosNotHaveAuth.get("/api/get/email/user", {
          params: body,
        });

        if (gmail) {
          const otp = Math.floor(Math.random() * 9000 + 1000);
          setOTP(otp);
          axiosNotHaveAuth
            .post("/api/send_recovery_email", {
              OTP: otp,
              recipient_email: email,
            })
            .then(() => setEmailLayout(false))
            .catch(console.log);
          return;
        }
      } catch (error) {
        console.error("Error fetching email", error);
      }
    } else {
      return alert("Nhập email của bạn");
    }
  };
  return (
    <div className="h-full w-full flex items-center justify-center mt-[100px] ">
      <div className="w-[502px] h-[277px] rounded-md bg-[#FFFFFF] p-3">
        <div className="font-bold text-2xl mb-3">Tìm tài khoản</div>
        <Separate />
        <div className="mt-2 text-black mb-3">
          Hãy nhập email của bạn để tìm tải khoản
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control h-[53px]"
            id="inputEmail4"
            placeholder="Địa chỉ email"
          />
        </div>
        <Separate />
        <div className="w-full flex justify-end mt-4">
          <div className="mr-2 w-[91px] h-[35px] rounded-lg bg-[#E4E6EB] flex items-center justify-center font-bold">
            Cancel
          </div>
          <div
            onClick={handleSearchEmail}
            className="w-[91px] h-[35px] rounded-lg bg-[#1877F2] flex items-center justify-center font-bold text-white"
          >
            Tìm kiếm
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputEmailForgot;
