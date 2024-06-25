import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosNotHaveAuth } from "../util/axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const body = JSON.stringify({ email, password });
      const res = await axiosNotHaveAuth.post("/api/user/login", body);
      const data = await res.data.metadata;
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Đăng nhập thành công");
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser({ user: data.user, tokens: data.tokens });
      navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Hãy điền đủ thông tin");
    return false;
  }
  return true;
}
