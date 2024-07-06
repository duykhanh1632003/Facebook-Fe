import React, { useEffect, useState } from "react";
import { axiosHaveAuth } from "../../../../../../util/axios";

const ImgOfUser = ({ userId }) => {
  const [images, setImages] = useState([]);
  const instance = axiosHaveAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await instance.get(`api/get/userImages/${userId}`);
        console.log("Check image", response);
        setImages(response.data.metadata);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [userId]);

  return (
    <div className="w-full rounded-lg p-3 mt-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">Ảnh</div>
        <div className="text-md text-blue-500 w-[119px] h-[30px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#0a0a0a34]">
          Xem tất cả ảnh
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {images.map((image, index) => (
          <div key={index} className="w-[129px] h-[129px]">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Ảnh ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgOfUser;
