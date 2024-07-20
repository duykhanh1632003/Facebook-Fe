import React, { useState } from "react";

const HaveMessageTinder = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const users = [
    { name: "Ngọc Quỳnh", message: "Hi" },
    { name: "Mai", message: "chào cậu" },
    { name: "vanh", message: "https://www.facebook.com/" },
    { name: "Minh Châu", message: "Biết" },
    { name: "Hân", message: "chào cậu" },
    { name: "Anh", message: "Chào cậu" },
    { name: "Anh", message: "Chào cậu" },
  ];

  return (
    <div className="w-full max-h-[591px] overflow-y-auto hide-scrollbar">
      {users.map((user, index) => (
        <div
          key={index}
          className={`h-[100px] w-full flex items-center justify-between ${
            selected === index ? "bg-[#111418]" : ""
          } cursor-pointer`}
          onClick={() => handleSelect(index)}
          onMouseEnter={() => handleSelect(index)}
          onMouseLeave={() => handleSelect(null)}
        >
          <div className="flex pl-5 pt-2">
            <div className="h-[80px] w-[80px] rounded-full">
              <img
                src="/src/assets/anh-dai-dien.jpg"
                className="h-[80px] w-[80px] rounded-full object-cover"
                alt="avt"
              />
            </div>
            <div className="max-w-[273px] ml-4">
              <div className="font-bold text-xl text-white">{user.name}</div>
              <div className="text-md text-[#ffffff5f]">{user.message}</div>
            </div>
          </div>
          {selected === index && (
            <div className="w-[4px] h-full bg-[#FE5048]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HaveMessageTinder;
