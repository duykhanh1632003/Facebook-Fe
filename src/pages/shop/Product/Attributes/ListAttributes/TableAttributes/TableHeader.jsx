import React from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const TableHeader = ({
  rowsPerPage,
  handleRowsPerPageChange,
  searchQuery,
  handleSearch,
}) => {
  const options = [10, 12, 20];

  return (
    <div className="flex justify-between mb-4">
      <div className="flex items-center">
        <div className="text-sm text-[#C3C5C9] mr-2">Showing</div>
        <div className="relative inline-block cursor-pointer">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-2xl w-[72px] py-2 pl-3 pr-8 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute mt-[-25px] right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown />
          </div>
        </div>
        <div className="text-sm text-[#C3C5C9] ml-2 mr-2">entries</div>
      </div>
      <div className="relative w-[460px] h-[49px]">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search here..."
          className="w-full h-[49px] pl-5 text-sm border rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-500 dark:text-gray-300" />
        </div>
      </div>
      <Link
        to={"/shop/add-attributes"}
        className="w-[210px] h-[51px] rounded-lg flex border-blue-1 hover:bg-blue-500 cursor-pointer hover:text-white border-[1px] items-center justify-center text-[#2275FC]"
      >
        <div className="text-lg">
          <IoMdAdd />
        </div>
        <div className="flex items-center font-bold">Add new</div>
      </Link>
    </div>
  );
};

export default TableHeader;
