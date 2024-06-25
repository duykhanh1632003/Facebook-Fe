import { toast } from "react-toastify";
import { useState } from "react";
import { axiosNotHaveAuth } from "./../util/axios";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    gender,
  }) => {
    const success = handleInputErrors({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
      });
      const res = await axiosNotHaveAuth.post("/api/user/signup", body);
      const data = res.data; // Lấy dữ liệu từ phản hồi
      if (data.error) {
        throw new Error(data.error); // Ném ra một lỗi với thông điệp từ server
      }
      toast.success("Đăng ký thành công");
      navigate("/login");
      // Xử lý kết quả thành công ở đây
    } catch (error) {
      if (error.message === "Cannot create account") {
        // Xử lý lỗi khi không thể tạo tài khoản
        toast.error("Không thể tạo tài khoản");
      } else {
        // Xử lý các lỗi khác
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    gender,
  }) => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !gender
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  return { signup, loading };
};

export default useSignup;
