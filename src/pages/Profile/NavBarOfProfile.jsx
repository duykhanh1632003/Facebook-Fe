import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const NavBarOfProfile = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const currentSection = section || "";

  const tabs = [
    { name: "Giới thiệu", path: "" },
    { name: "Bài viết", path: "posts" },
    { name: "Ảnh", path: "photos" },
    { name: "Bạn bè", path: "friends" },
    { name: "Video", path: "videos" },
    { name: "Check-in", path: "checkin" },
  ];

  const handleClick = (path) => {
    navigate(`/profile/${authUser.user._id}/${path}`);
  };

  return (
    <div className="mt-2 flex">
      {tabs.map((tab) => (
        <div key={tab.path} onClick={() => handleClick(tab.path)}>
          <div
            className={`w-[93px] flex items-center justify-center font-medium h-[50px] text-[#65676B] hover:bg-[#8582826c] rounded-lg cursor-pointer ${
              currentSection === tab.path ? "hidden" : ""
            }`}
          >
            {tab.name}
          </div>
          <div
            className={`w-[93px] flex items-center justify-center font-bold h-[50px] rounded-lg cursor-pointer ${
              currentSection === tab.path ? "text-blue-600" : "hidden"
            }`}
          >
            {tab.name}
          </div>
          <div
            className={`h-[4px] w-[92px] bg-blue-500 ${
              currentSection === tab.path ? "" : "hidden"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default NavBarOfProfile;
