import { useEffect, useState } from "react";
import { MaterialUISwitch } from "../theme/Switch";

export default function ChangeDarkMode() {
  // Initialize state for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Get dark mode setting from localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null; // Default to dark mode if no setting is found
  });

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const switchDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Return the UI
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
