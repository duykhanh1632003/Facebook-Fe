import React from "react";

const HaveCompatibles = () => {
  const users = [
    { name: "Hà Giang", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Linh", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Thủy", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Vân Anh", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Phương", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Minh Hương", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Mary", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "Phạm Hằng", image: "/src/assets/anh-dai-dien.jpg" },
    { name: "duwgem", image: "/src/assets/anh-dai-dien.jpg" },
  ];

  return (
    <div className="w-full h-full mt-3 flex flex-wrap pl-3 pr-3 gap-3">
      {users.map((user, index) => (
        <div
          key={index}
          className="w-[104px] h-[122px] rounded-md bg-cover bg-center flex items-end justify-center text-white font-bold p-2 hover:scale-110 transform transition-transform"
          style={{ backgroundImage: `url('${user.image}')` }}
        >
          <div className="bg-black bg-opacity-50 px-2 py-1 rounded-md">
            {user.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HaveCompatibles;
