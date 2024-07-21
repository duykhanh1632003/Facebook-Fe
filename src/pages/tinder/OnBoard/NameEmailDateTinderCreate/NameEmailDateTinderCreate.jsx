import React from "react";
import AvatarProfileTInder from "../AvatarProfile/AvatarProfileTInder";
import OptionTinderCreate from "./OpTionTinder/OptionTinderCreate";
import { useTinderContext } from "../../../../context/TinderContext";

const NameEmailDateTinderCreate = () => {
  const { formData, errors, handleInputChange } = useTinderContext();

  return (
    <div className="flex">
      <div className="w-[511px]">
        <div className="w-[511px]">
          <label
            htmlFor="name"
            className="block text-foreground font-semibold mb-1 text-white"
          >
            Tên
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tên"
            value={formData.name}
            onChange={handleInputChange}
            className={`text-white w-full p-2 border-[2px]  ${
              errors.name ? "border-red-600" : "border-blue-500"
            } text-foreground bg-background rounded focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-600" : "focus:ring-blue-500"
            } bg-black`}
          />
          {errors.name && (
            <p className="mt-1 text-destructive text-red-600 font-bold">
              {errors.name}
            </p>
          )}
        </div>
        <div className="w-[511px]">
          <label
            htmlFor="email"
            className="block text-foreground font-semibold mb-1 text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="duykhanh1632003@gmail.com"
            value={formData.email}
            readOnly
            className="w-full p-2 border border-blue-500 text-foreground bg-background rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black cursor-not-allowed pointer-events-none"
          />
        </div>
        <div className="w-[511px]">
          <label
            htmlFor="birthday"
            className="block text-foreground font-semibold mb-1 text-white"
          >
            Sinh nhật
          </label>
          <div className="flex space-x-4">
            <div className="">
              <label className="block text-foreground font-bold mb-1 text-white">
                Day
              </label>
              <input
                id="day"
                type="text"
                placeholder="DD"
                value={formData.day}
                onChange={handleInputChange}
                className={`w-16 h-10 text-center bg-card text-card-foreground border-[2px]  ${
                  errors.date ? "border-red-600" : "border-blue-500"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.date ? "focus:ring-red-600" : "focus:ring-blue-500"
                } bg-black text-white`}
              />
            </div>
            <div className="">
              <label className="block text-foreground font-bold mb-1 text-white">
                Month
              </label>
              <input
                id="month"
                type="text"
                placeholder="MM"
                value={formData.month}
                onChange={handleInputChange}
                className={`w-16 h-10 text-center bg-card text-card-foreground border-[2px]  ${
                  errors.date ? "border-red-600" : "border-blue-500"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.date ? "focus:ring-red-600" : "focus:ring-blue-500"
                } bg-black text-white`}
              />
            </div>
            <div className="">
              <label className="block text-foreground font-bold mb-1 text-white">
                Year
              </label>
              <input
                id="year"
                type="text"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleInputChange}
                className={`w-20 h-10 text-center bg-card text-card-foreground border-[2px]  ${
                  errors.date ? "border-red-600" : "border-blue-500"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.date ? "focus:ring-red-600" : "focus:ring-blue-500"
                } bg-black text-white`}
              />
            </div>
          </div>
          {errors.date && (
            <p className="mt-1 text-destructive text-red-600 font-bold">
              {errors.date}
            </p>
          )}
        </div>
        <OptionTinderCreate />
      </div>
      <div className="text-white ml-[53px]">
        <AvatarProfileTInder />
      </div>
    </div>
  );
};

export default NameEmailDateTinderCreate;
