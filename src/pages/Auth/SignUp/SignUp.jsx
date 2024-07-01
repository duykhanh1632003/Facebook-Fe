import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HelpIcon from "@mui/icons-material/Help";
import "../SignIn/SignIn.css";
import { Link } from "react-router-dom";
import useSignup from "../../../hooks/useSignUp";
import { axiosNotHaveAuth } from "../../../util/axios";
import axios from "axios";
const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const handleGenderClick = (gender) => {
    setGender(gender);
  };
  const { signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ firstName, lastName, email, password, phoneNumber, gender });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnLoginGoogle = async () => {
    try {
      window.open("http://localhost:8000/auth/google/callback");
    } catch (error) {
      console.error("Google Login Error:", error);
      // Handle Google login error
    }
  };

  return (
    <div className="flex pl-[272px] bg-[#F0F2F5] w-full h-screen">
      <div className="w-[250px] h-[70px] mt-[99px] mr-[332px]">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt="logo"
        />
      </div>
      <div className="w-[398px] bg-[#FFFFFF] h-[570px] mt-[40px] rounded-1 flex flex-col items-center">
        <div>
          <div className="flex justify-between w-[366px]">
            <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[170px] h-[52px] bg-[##FFFFFF] mb-[12px] mt-[18px]">
              <textarea
                className="w-full bg-transparent outline-none resize-none text-sm input-textarea"
                placeholder="Họ"
                onChange={(e) => setFirstName(e.target.value)}
              ></textarea>
            </div>
            <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[170px] h-[52px] bg-[##FFFFFF] mb-[12px] mt-[18px]">
              <textarea
                className="w-full bg-transparent outline-none resize-none text-sm input-textarea"
                placeholder="Tên"
                onChange={(e) => setLastName(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[364px] h-[52px] bg-[##FFFFFF] mb-[12px] mt-[0px]">
          <textarea
            className="w-full bg-transparent outline-none resize-none text-sm input-textarea"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></textarea>
        </div>
        <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[364px] h-[52px] bg-[##FFFFFF] mb-[16px]">
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full bg-transparent outline-none resize-none text-sm input-textarea h-full ml-[15px]"
            placeholder="Mật khẩu"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </button>
        </div>{" "}
        <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[364px] h-[52px] bg-[##FFFFFF] mb-[12px] mt-[0px]">
          <textarea
            className="w-full bg-transparent outline-none resize-none text-sm input-textarea"
            placeholder="Số điện thoại"
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div className="text-sm">
            Giới tính{" "}
            <span className="w-[1px] h-[4px]">
              <HelpIcon />
            </span>
          </div>
          <div className="flex justify-between w-[366px] mb-[18px]">
            <div
              onClick={() => handleGenderClick("female")}
              className="border cursor-pointer border-gray-300 rounded-lg flex w-[110px] h-[37px] justify-between items-center pl-[12px] pr-[12px]"
            >
              <div>Nữ</div>
              <div
                className={
                  gender !== "female"
                    ? "border rounded-full border-gray-300 w-[14px] h-[14px]"
                    : "border rounded-full bg-[#005CC8] border-[#005CC8] w-[14px] h-[14px]"
                }
              ></div>
            </div>
            <div
              onClick={() => handleGenderClick("male")}
              className=" cursor-pointer border border-gray-300 rounded-lg flex w-[110px] h-[37px] justify-between items-center pl-[12px] pr-[12px]"
            >
              <div>Nam</div>
              <button
                className={
                  gender !== "male"
                    ? "border rounded-full border-gray-300 w-[14px] h-[14px]"
                    : "border rounded-full bg-[#005CC8] border-[#005CC8] w-[14px] h-[14px]"
                }
              ></button>
            </div>
            <div
              onClick={() => handleGenderClick("other")}
              className="border cursor-pointer border-gray-300 rounded-lg flex w-[110px] h-[37px] justify-between items-center pl-[12px] pr-[12px]"
            >
              <div>Khác</div>
              <div
                className={
                  gender !== "other"
                    ? "border rounded-full border-gray-300 w-[14px] h-[14px]"
                    : "border rounded-full bg-[#005CC8] border-[#005CC8] w-[14px] h-[14px]"
                }
              ></div>
            </div>
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className="w-[364px] h-[52px] bg-[#0866FF] hover:bg-[#4889f1] rounded-lg cursor-pointer flex justify-center items-center text-[#FFFFFF] text-xl font-medium"
        >
          Đăng ký
        </div>
        <div onClick={handleOnLoginGoogle} className="google mt-3">
          <div className="text-md mr-2">Đăng ký với google</div>
          <img
            className="h-[20px] w-[20px]"
            src="/src/assets/Remove-bg.ai_1719840154036.png"
          />
        </div>
        <div className="underline"> </div>
        <Link to={"/login"} className="register">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
