import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaEye,
  FaPencilAlt,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import { generateAttributes } from "../../../../../../util/util";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const TableAttributes = () => {
  const [attributes, setAttributes] = useState(generateAttributes());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const filteredAttributes = generateAttributes().filter((attribute) =>
        attribute.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAttributes(filteredAttributes);
    } else {
      setAttributes(generateAttributes());
    }
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when rows per page change
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const currentData = attributes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const options = [10, 12, 20];

  return (
    <div className="w-full mt-5 bg-white dark:bg-gray-900 p-4 rounded-lg">
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
          <Link className="flex items-center font-bold">Add new</Link>
        </Link>
      </div>
      <TableContainer component={Paper} className="dark:bg-gray-800">
        <Table>
          <TableHead className="dark:bg-gray-900 h-[45px] flex justify-center">
            <TableRow>
              <TableCell className="dark:text-white">Category</TableCell>
              <TableCell className="dark:text-white">Value</TableCell>
              <TableCell className="dark:text-white">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((attribute, index) => (
              <TableRow
                key={attribute.id}
                className={`h-[45px] mb-2 ${
                  index % 2 === 0 ? "bg-[#F7FAFC]" : "bg-white"
                } rounded-lg dark:text-white`}
              >
                <TableCell>{attribute.category}</TableCell>
                <TableCell>{attribute.value}</TableCell>
                <TableCell className="flex">
                  <IconButton className="action-icon w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-1">
                    <FaEye className="text-blue-500" />
                  </IconButton>
                  <IconButton className="action-icon w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-1">
                    <FaPencilAlt className="text-green-500" />
                  </IconButton>
                  <IconButton className="action-icon w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-1">
                    <FaTrashAlt className="text-red-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full justify-end flex">
        {" "}
        <Pagination
          color="primary"
          count={Math.ceil(attributes.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          className="mt-4 "
        />
      </div>
    </div>
  );
};

export default TableAttributes;
