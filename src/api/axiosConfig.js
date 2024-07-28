import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../util/authHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../util/errorHandler";

const createAxiosInstance = (auth = false) => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/v1",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "9bb7a851135545a6005bd79f5f4e33dfb23d46b9e90c281448ef8cc11f2c0c46605fa9dbea510052fed6799537d4df04aa1b28298440b61bc5afa360f7e1fc4b",
    },
  });

  if (auth) {
    instance.defaults.headers.common["authorization"] = getAccessToken();
    instance.defaults.headers.common["refreshToken"] = getRefreshToken();
  }

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await axios.post(
            "http://localhost:8000/v1/api/user/refreshAccessToken",
            { refreshToken }
          );
          const { accessToken } = response.data.tokens;

          // Cập nhật token trong localStorage và context
          setTokens(accessToken, refreshToken);

          instance.defaults.headers.common["authorization"] = `${accessToken}`;
          originalRequest.headers["authorization"] = `${accessToken}`;

          return instance(originalRequest);
        } catch (err) {
          // Xử lý lỗi refresh token, ví dụ: chuyển hướng đến trang đăng nhập
          toast.error("Session expired. Please log in again.");
          clearTokens();
          const navigate = useNavigate();
          navigate("/login"); // Hoặc dùng phương thức khác để điều hướng
        }
      }
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosHaveAuthV2 = createAxiosInstance(true);
const axiosNotHaveAuthV2 = createAxiosInstance(false);

export { axiosHaveAuthV2, axiosNotHaveAuthV2 };
