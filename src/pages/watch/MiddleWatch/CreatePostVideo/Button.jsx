import React from "react";

function Button({ name, onClick, icon, bg, type, disabled }) {
  return (
    <button
      className={`flex items-center gap-2 py-2 px-4  dark:bg-[#3A3B3C] rounded-lg text-white font-semibold transition-all duration-300 ${bg}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon}
      {name}
    </button>
  );
}

export default Button;
