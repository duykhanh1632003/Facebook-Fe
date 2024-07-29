import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { FaTag } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./LeftSideBarShop.css"; // Import the CSS file

const LeftSideBarShop = () => {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [isDiscountsOpen, setIsDiscountsOpen] = useState(false);

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleAttributesMenu = () => {
    setIsAttributesOpen(!isAttributesOpen);
  };

  const toggleDiscountsMenu = () => {
    setIsDiscountsOpen(!isDiscountsOpen);
  };

  return (
    <div className="w-[307px] p-3 bg-white h-full pt-5 fixed">
      <Link
        to="/shop"
        className={`h-[49px] w-full flex items-center text-xl font-bold rounded-md p-2 mb-2 ${
          location.pathname === "/shop"
            ? "text-blue-500 bg-[#F1F1F1]"
            : "text-[#777687]"
        }`}
      >
        <MdDashboard
          className={`mr-2 ${
            location.pathname === "/shop" ? "text-blue-500" : ""
          }`}
        />
        <div>Dashboard</div>
      </Link>

      <div
        className={`h-[49px] w-full flex items-center text-xl font-bold ${
          location.pathname.includes("/shop/product")
            ? "bg-[#F1F1F1] text-blue-500"
            : "text-[#777687]"
        } rounded-md p-2 cursor-pointer`}
        onClick={toggleProductsMenu}
      >
        <div className="flex items-center">
          <div
            className={`${
              location.pathname.includes("/shop/product")
                ? "bg-blue-500"
                : "bg-[#5E5D72]"
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
              className={`block py-1 hover:text-blue-500 ${
                location.pathname === "/shop/product-list"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Product List
            </Link>
            <Link
              to="/shop/product-view"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/product-view"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Product View
            </Link>
            <Link
              to="/shop/product-upload"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/product-upload"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Product Upload
            </Link>
          </div>
        </div>
      )}

      <div
        className={`h-[49px] w-full flex items-center text-xl font-bold ${
          location.pathname.includes("/shop/attributes")
            ? "bg-[#F1F1F1] text-blue-500"
            : "text-[#777687]"
        } rounded-md p-2 cursor-pointer`}
        onClick={toggleAttributesMenu}
      >
        <div className="flex items-center">
          <LuBox
            className={`mr-2 ${
              location.pathname.includes("/shop/attributes")
                ? "text-blue-500"
                : ""
            }`}
          />
          <div
            className={`mr-2 ${
              location.pathname.includes("/shop/attributes")
                ? "text-blue-500"
                : ""
            }`}
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
              className={`block py-1 hover:text-blue-500 ${
                location.pathname === "/shop/attributes-list"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              List Attributes
            </Link>
            <Link
              to="/shop/add-attributes"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/add-attributes"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Add Attributes
            </Link>
          </div>
        </div>
      )}

      <div
        className={`h-[49px] w-full flex items-center text-xl font-bold ${
          location.pathname.includes("/shop/discount")
            ? "bg-[#F1F1F1] text-blue-500"
            : "text-[#777687]"
        } rounded-md p-2 cursor-pointer`}
        onClick={toggleDiscountsMenu}
      >
        <div className="flex items-center">
          <FaTag
            className={`mr-2 ${
              location.pathname.includes("/shop/discount")
                ? "text-blue-500"
                : ""
            }`}
          />
          <div className="ml-2">Discount</div>
        </div>
        <div
          className={`ml-auto ${isDiscountsOpen ? "rotate-down" : "rotate-up"}`}
        >
          <FaChevronRight />
        </div>
      </div>
      {isDiscountsOpen && (
        <div className="flex items-center mt-2 text-[#b6b4c7] font-medium">
          <div className="w-[2px] h-[99px] bg-[#F1F1F1]"></div>
          <div className={`products-menu ${isDiscountsOpen ? "open" : ""}`}>
            <Link
              to="/shop/discount-list"
              className={`block py-1 hover:text-blue-500 ${
                location.pathname === "/shop/discount-list"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              List Discount
            </Link>
            <Link
              to="/shop/create-discount"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/create-discount"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Create Discount
            </Link>
            <Link
              to="/shop/edit-discount"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/edit-discount"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Edit Discount
            </Link>
            <Link
              to="/shop/delete-discount"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/delete-discount"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Delete Discount
            </Link>
            <Link
              to="/shop/discount-analytics"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/discount-analytics"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Discount Analytics
            </Link>
            <Link
              to="/shop/expired-discounts"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/expired-discounts"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Expired Discounts
            </Link>
            <Link
              to="/shop/active-discounts"
              className={`block py-1 hover:text-blue-500 mt-2 ${
                location.pathname === "/shop/active-discounts"
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Active Discounts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSideBarShop;
