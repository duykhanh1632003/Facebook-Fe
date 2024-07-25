import React from "react";
import { FaUserAlt, FaShoppingCart, FaLock } from "react-icons/fa";
import "./InfoCard.css";

const InfoCard = ({ title, count, icon, gradient }) => {
  return (
    <div className="info-card" style={{ background: gradient }}>
      <div className="info-content">
        <div className="info-text">
          <div className="info-title">{title}</div>
          <div className="info-count">{count}</div>
        </div>
        <div className="info-icon">{icon}</div>
      </div>
    </div>
  );
};

export default InfoCard;
