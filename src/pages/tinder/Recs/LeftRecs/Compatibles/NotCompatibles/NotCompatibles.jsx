import React from "react";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import "./NotCompatibles.css"; // Import the CSS file

const NotCompatibles = () => {
  return (
    <div className="container-NotCompatibles">
      <div className="rotating-div-NotCompatibles"></div>
      <div className="title-NotCompatibles">Bắt đầu tìm tương hợp</div>
      <div className="description-NotCompatibles">
        Các tương hợp sẽ xuất hiện ở đây sau khi bạn bắt đầu Thích các thành
        viên khác. Bạn có thể nhắn tin trực tiếp cho họ ngay từ đây khi đã sẵn
        sàng bắt chuyện làm quen.
      </div>
    </div>
  );
};

export default NotCompatibles;
