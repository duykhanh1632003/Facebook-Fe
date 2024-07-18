import React from "react";
import { useState } from "react";
import "./CreateAccount.css";
const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: { day: "", month: "", year: "" },
    gender: "",
    showGenderOnProfile: false,
    interestedIn: "",
    lookingFor: "",
    hobbies: "",
    sexualOrientation: "",
    profilePictures: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      birthDate: { ...formData.birthDate, [name]: value },
    });
  };

  const handleProfilePictureChange = (e) => {
    // handle profile picture upload logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="form-container">
      <h2>Tạo tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength="22"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Sinh nhật</label>
          <div className="date-inputs">
            <input
              type="text"
              name="day"
              value={formData.birthDate.day}
              onChange={handleDateChange}
              placeholder="DD"
              required
            />
            <input
              type="text"
              name="month"
              value={formData.birthDate.month}
              onChange={handleDateChange}
              placeholder="MM"
              required
            />
            <input
              type="text"
              name="year"
              value={formData.birthDate.year}
              onChange={handleDateChange}
              placeholder="YYYY"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={formData.gender === "Nam"}
                onChange={handleInputChange}
              />{" "}
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={formData.gender === "Nữ"}
                onChange={handleInputChange}
              />{" "}
              Nữ
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Khác"
                checked={formData.gender === "Khác"}
                onChange={handleInputChange}
              />{" "}
              Thêm
            </label>
          </div>
          <label>
            <input
              type="checkbox"
              name="showGenderOnProfile"
              checked={formData.showGenderOnProfile}
              onChange={() =>
                setFormData({
                  ...formData,
                  showGenderOnProfile: !formData.showGenderOnProfile,
                })
              }
            />{" "}
            Hiển thị giới tính trên hồ sơ của tôi
          </label>
        </div>

        <div className="form-group">
          <label>Quan tâm tới hồ sơ của</label>
          <div className="interest-options">
            <label>
              <input
                type="radio"
                name="interestedIn"
                value="Nam"
                checked={formData.interestedIn === "Nam"}
                onChange={handleInputChange}
              />{" "}
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="interestedIn"
                value="Nữ"
                checked={formData.interestedIn === "Nữ"}
                onChange={handleInputChange}
              />{" "}
              Nữ
            </label>
            <label>
              <input
                type="radio"
                name="interestedIn"
                value="Mọi người"
                checked={formData.interestedIn === "Mọi người"}
                onChange={handleInputChange}
              />{" "}
              Mọi người
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Đang tìm kiếm</label>
          <input
            type="text"
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Sở Thích</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>KHUYNH HƯỚNG TÍNH DỤC</label>
          <input
            type="text"
            name="sexualOrientation"
            value={formData.sexualOrientation}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group profile-picture">
          <label>Ảnh hồ sơ</label>
          <div className="profile-picture-container">
            {formData.profilePictures.map((picture, index) => (
              <div key={index} className="profile-picture-box">
                <img src={picture} alt={`Profile ${index}`} />
                <button
                  type="button"
                  onClick={() => handleProfilePictureChange(index)}
                >
                  X
                </button>
              </div>
            ))}
            {[...Array(4 - formData.profilePictures.length)].map((_, index) => (
              <div key={index} className="profile-picture-box empty">
                <button type="button" onClick={handleProfilePictureChange}>
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Tiếp tục
        </button>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>.
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
