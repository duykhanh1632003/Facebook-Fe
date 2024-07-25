import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./LeftSideBarShop.css"; // Import the CSS file

const LeftSideBarShop = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [route, setRoute] = useState("dashboard");

  const toggleProductsMenu = () => {
    setRoute("product");
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleAttributesMenu = () => {
    setRoute("attributes");
    setIsAttributesOpen(!isAttributesOpen);
  };

  return (
    <div className="w-[307px] p-3 bg-white h-full pt-5 fixed">
      <Link
        onClick={() => setRoute("dashboard")}
        to={"/shop"}
        className={`h-[49px] w-full flex items-center text-xl font-bold text-[#777687] rounded-md p-2 mb-2 ${
          route === "dashboard" ? "text-blue-500 bg-[#F1F1F1]" : ""
        }`}
      >
        <MdDashboard
          className={`mr-2 ${route === "dashboard" ? "text-blue-500" : ""}`}
        />
        <div className="text-[#777687] font-bold">Dashboard</div>
      </Link>
      <div
        className={`h-[49px] w-full flex items-center text-xl font-bold text-[#777687] ${
          route === "product" ? "bg-[#F1F1F1]" : ""
        } rounded-md p-2 cursor-pointer`}
        onClick={toggleProductsMenu}
      >
        <div className="flex items-center">
          <div
            className={`${
              route === "product" ? "bg-blue-500" : "bg-[#5E5D72]"
            } text-white rounded-full w-7 h-7 flex items-center justify-center`}
          >
            P
          </div>
          <div className="ml-2">Products</div>
        </div>
        <div
          className={`ml-auto ${isProductsOpen ? "rotate-down" : "rotate-up"}`}
        >
          <FaChevronRight />
        </div>
      </div>
      {isProductsOpen && (
        <div className="flex items-center mt-2 text-[#b6b4c7] font-medium">
          <div className="w-[2px] h-[99px] bg-[#F1F1F1]"></div>
          <div className={`products-menu ${isProductsOpen ? "open" : ""}`}>
            <Link
              to="/shop/product-list"
              className="block py-1 text-gray-700 hover:text-blue-500"
            >
              Product List
            </Link>
            <Link
              to="/shop/product-view"
              className="block py-1 text-gray-700 hover:text-blue-500 mt-2"
            >
              Product View
            </Link>
            <Link
              to="/shop/product-upload"
              className="block py-1 text-gray-700 hover:text-blue-500 mt-2"
            >
              Product Upload
            </Link>
          </div>
        </div>
      )}
      <div
        className={`h-[49px] w-full flex items-center text-xl font-bold text-[#777687] ${
          route === "attributes" ? "bg-[#F1F1F1]" : ""
        } rounded-md p-2 cursor-pointer`}
        onClick={toggleAttributesMenu}
      >
        <div className="flex items-center">
          <LuBox
            className={`mr-2 ${route === "attributes" ? "text-blue-500" : ""}`}
          />
          <div
            className={`mr-2 ${route === "attributes" ? "text-blue-500" : ""}`}
          >
            Attributes
          </div>
        </div>
        <div
          className={`ml-auto ${
            isAttributesOpen ? "rotate-down" : "rotate-up"
          }`}
        >
          <FaChevronRight />
        </div>
      </div>
      {isAttributesOpen && (
        <div className="flex items-center mt-2 text-[#b6b4c7] font-medium">
          <div className="w-[2px] h-[99px] bg-[#F1F1F1]"></div>
          <div className={`products-menu ${isAttributesOpen ? "open" : ""}`}>
            <Link
              to="/shop/attributes-list"
              className="block py-1 text-gray-700 hover:text-blue-500"
            >
              List Attributes
            </Link>
            <Link
              to="/shop/add-attributes"
              className="block py-1 text-gray-700 hover:text-blue-500 mt-2"
            >
              Add Attributes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSideBarShop;
