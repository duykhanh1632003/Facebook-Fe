import { useState } from "react";
import OTPInput from "./OTPInput";
import InputEmailForgot from "./InputEmailForgot";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";

const ForgotPassWordLayout = () => {
  const [emailLayout, setEmailLayout] = useState("email");
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState();

  const handleChangeLogin = () => {
    navigate("/login");
  };
  return (
    <div className="bg-[#E9EBEE] h-screen">
      <div className="h-[58px] w-full shadow-lg">
        <div
          onClick={handleChangeLogin}
          className="w-[137px] cursor-pointer h-[58px] ml-4"
        >
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
            alt="logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div>
        {" "}
        {emailLayout === "email" && (
          <InputEmailForgot
            setOTP={setOTP}
            OTP={OTP}
            setEmailLayout={setEmailLayout}
            email={email}
            setEmail={setEmail}
          />
        )}
        {emailLayout === "sendOTP" && (
          <OTPInput
            email={email}
            OTP={OTP}
            setOTP={setOTP}
            setEmailLayout={setEmailLayout}
          />
        )}
        {emailLayout === "reset" && (
          <ResetPassword email={email} setEmailLayout={setEmailLayout} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassWordLayout;
