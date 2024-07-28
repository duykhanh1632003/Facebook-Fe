import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const axiosHaveAuth = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000/v1",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "9bb7a851135545a6005bd79f5f4e33dfb23d46b9e90c281448ef8cc11f2c0c46605fa9dbea510052fed6799537d4df04aa1b28298440b61bc5afa360f7e1fc4b",
      authorization: localStorage.getItem("accessToken"),
      "x-client-id": authUser.user._id,
      refreshToken: localStorage.getItem("refreshToken"),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await axios.post(
            "http://localhost:8000/v1/api/user/refreshAccessToken",
            { refreshToken }
          );
          const { accessToken } = response.data.tokens;

          // Cập nhật token trong localStorage và context
          localStorage.setItem("accessToken", accessToken);
          setAuthUser((prev) => ({
            ...prev,
            tokens: {
              ...prev.tokens,
              accessToken,
            },
          }));

          instance.defaults.headers.common["authorization"] = `${accessToken}`;
          originalRequest.headers["authorization"] = `${accessToken}`;

          return instance(originalRequest);
        } catch (err) {
          // Xử lý lỗi refresh token, ví dụ: chuyển hướng đến trang đăng nhập
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login"); // Hoặc dùng phương thức khác để điều hướng
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosNotHaveAuth = axios.create({
  baseURL: "http://localhost:8000/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "9bb7a851135545a6005bd79f5f4e33dfb23d46b9e90c281448ef8cc11f2c0c46605fa9dbea510052fed6799537d4df04aa1b28298440b61bc5afa360f7e1fc4b",
  },
});

export { axiosHaveAuth, axiosNotHaveAuth };
