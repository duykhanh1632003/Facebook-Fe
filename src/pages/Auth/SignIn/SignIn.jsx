import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./SignIn.css";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useLogin();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitLogin(e);
    }
  };

  const loginWithGoogle = () => {
    try {
      const googleLoginUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        new URLSearchParams({
          response_type: "code",
          client_id:
            "82844157331-qf8ut3n0n3dbdbigeddqmkv4kpuf8u0m.apps.googleusercontent.com",
          redirect_uri: "http://localhost:8000/auth/google/callback",
          scope: "email profile",
        }).toString();
      window.open(googleLoginUrl, "_self");
    } catch (error) {
      console.error("Google Login Error:", error);
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
      <div className="w-[398px] h-[430px] bg-[#FFFFFF] mt-[130px] rounded-1 flex flex-col items-center">
        <form
          onSubmit={handleSubmitLogin}
          className="flex flex-col items-center"
        >
          <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[364px] h-[52px] bg-[##FFFFFF] mb-[12px] mt-[18px]">
            <textarea
              className="w-full bg-transparent outline-none mt-3 ml-3 resize-none text-sm input-textarea"
              placeholder="Email hoặc số điện thoại"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            ></textarea>
          </div>
          <div className="relative border border-gray-300 rounded-lg focus-within:border-blue-500 w-[364px] h-[52px] bg-[##FFFFFF] mb-[16px]">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full bg-transparent outline-none resize-none text-sm input-textarea h-full ml-[15px]"
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <button
            type="submit"
            className="w-[364px] h-[52px] bg-[#0866FF] hover:bg-[#4889f1] rounded-lg cursor-pointer flex justify-center items-center text-[#FFFFFF] text-xl font-medium"
          >
            Đăng nhập
          </button>
        </form>
        <Link
          to={"/forgot"}
          className="mt-[18px] text-sm text-[#0899FF] cursor-pointer relative"
        >
          <span className="group">Quên mật khẩu?</span>
        </Link>
        <div className="underline"></div>
        <Link to="/signup" className="register">
          Tạo tài khoản mới
        </Link>
        <div onClick={loginWithGoogle} className="google mt-3">
          <div className="text-md mr-2">Đăng nhập với google</div>
          <img
            className="h-[20px] w-[20px]"
            src="/src/assets/Remove-bg.ai_1719840154036.png"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
