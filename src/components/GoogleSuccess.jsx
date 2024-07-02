import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const GoogleSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const user = query.get("user");
    if (user) {
      const parsedUser = JSON.parse(decodeURIComponent(user));

      localStorage.setItem("user", JSON.stringify(parsedUser));
      setAuthUser({ user: parsedUser.user });
      // Redirect to home or any other page after successful login
      navigate("/");
    } else {
      // Redirect to login if no user data found
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleSuccess;
