import { useState } from "react";
import OTPInput from "./OTPInput";
import InputEmailForgot from "./InputEmailForgot";

const ForgotPassWordLayout = () => {
  const [emailLayout, setEmailLayout] = useState(true);
  const [email, setEmail] = useState(null);

  const [OTP, setOTP] = useState();
  return (
    <div className="bg-[#E9EBEE] h-screen">
      <div className="h-[58px] w-full shadow-lg">
        <div className="w-[137px] h-[58px] ml-4">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
            alt="logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div>
        {" "}
        {emailLayout ? (
          <InputEmailForgot
            setOTP={setOTP}
            OTP={OTP}
            setEmailLayout={setEmailLayout}
            email={email}
            setEmail={setEmail}
          />
        ) : (
          <OTPInput email={email} OTP={OTP} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassWordLayout;
