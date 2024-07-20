import React from "react";
import "./NotMessageTinder.css";
import { IoChatbubblesSharp } from "react-icons/io5";

const NotMessageTinder = () => {
  return (
    <div className="container-NotMessageTinder">
      <div className="rotating-div-NotMessageTinder">
        <IoChatbubblesSharp />
      </div>
      <div className="title-NotMessageTinder">Gửi lời chào</div>
      <div className="description-NotMessageTinder">
        Bạn đang tìm cách bắt chuyện? Khi đã tương hợp, bạn có thể gửi tin nhắn
        cho họ tại mục "Các Tương Hợp"
      </div>
    </div>
  );
};

export default NotMessageTinder;
