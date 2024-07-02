import { useEffect, useState, useRef } from "react";
import { axiosNotHaveAuth } from "../../../util/axios";

const OTPInput = ({ email, OTP, setOTP, setEmailLayout }) => {
  const [timerCount, setTimer] = useState(60);
  const [OTPInput, setOTPInput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(false);
  const inputRefs = useRef([]);

  const resendOTP = async () => {
    if (disable) return;
    const otp = Math.floor(Math.random() * 9000 + 1000);
    setOTP(otp);
    const response = await axiosNotHaveAuth.post("/api/send_recovery_email", {
      OTP: otp,
      recipient_email: email,
    });
    if (response) {
      setDisable(true);
      alert("OTP mới đã được gửi vào email bạn");
      setTimer(60);
    }
  };

  const verifyOTP = () => {
    if (parseInt(OTPInput.join("")) === OTP) {
      setEmailLayout("reset");
      return;
    }
    setOTPInput(["", "", "", ""]);
    alert("OTP không đúng vui lòng nhập lại");
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount <= 0 ? lastTimerCount : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOTPInput = [...OTPInput];
    newOTPInput[index] = value;
    setOTPInput(newOTPInput);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !OTPInput[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-8 py-12 shadow-xl mx-auto w-full max-w-md rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Email Verification</h2>
          <p className="text-gray-600">
            We have sent a code to your email {email}
          </p>
        </div>
        <div className="flex justify-center mb-8 focus:border-blue-500">
          {OTPInput.map((otp, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              className="w-12 h-12 mx-2 text-center text-lg border border-gray-300 focus:ring-1 rounded focus:border-blue-500 focus:outline-none ring-blue-700"
              type="text"
              value={otp}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={verifyOTP}
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Verify Account
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-600">Không thể tạo mã?</p>
          <button
            type="button"
            className="text-blue-600 underline disabled:text-gray-400"
            onClick={resendOTP}
            disabled={disable}
          >
            {disable ? `GỬi lại OTP trong ${timerCount}s` : "Gửi lại OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
