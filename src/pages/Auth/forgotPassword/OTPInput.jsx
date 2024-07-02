import { useState } from "react";

const OTPInput = ({ email, OTP }) => {
  const [timerCount, setTimer] = useState(60);
  const [OTPInput, setOTPInput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(false);
  return <div></div>;
};

export default OTPInput;
