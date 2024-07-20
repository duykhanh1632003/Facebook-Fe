// RippleEffect.js
import React from "react";
import "./RippleEffect.css";

const RippleEffect = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="ripple-container">
        <div className="center-image"></div>
        <div className="ripple" style={{ animationDelay: "0s" }}></div>
        <div className="ripple" style={{ animationDelay: "1s" }}></div>
        <div className="ripple" style={{ animationDelay: "2s" }}></div>
        <div className="ripple" style={{ animationDelay: "3s" }}></div>
      </div>
    </div>
  );
};

export default RippleEffect;
