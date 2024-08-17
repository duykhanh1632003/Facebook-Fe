import { useEffect, useState } from "react";
import { MaterialUISwitch } from "../theme/Switch";

export default function ChangeDarkMode() {
  // Khởi tạo state cho chế độ tối
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", false);
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const switchDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Trả về giao diện người dùng
  return (
    <div>
      <MaterialUISwitch
        onClick={switchDarkMode}
        checked={darkMode}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}
