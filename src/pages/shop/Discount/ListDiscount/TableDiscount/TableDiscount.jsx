import React, { useState, useMemo, useEffect } from "react";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LuArrowUpRight } from "react-icons/lu";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import generateDiscounts from "../../../../../util/generateDiscount";
import { BsThreeDots } from "react-icons/bs";
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 10;

const TableDiscount = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allDataTable, setAllDataTable] = useState(generateDiscounts());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "discount_name",
    direction: "ascending",
  });

  useEffect(() => {
    const filteredData = generateDiscounts().filter((discount) =>
      discount.discount_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAllDataTable(filteredData);
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...allDataTable];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [allDataTable, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(allDataTable.length / ITEMS_PER_PAGE);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Discounts");
    XLSX.writeFile(workbook, "discounts.xlsx");
  };

  return (
    <div className="w-full bg-white shadow rounded-lg p-4 mt-4">
      <div className="w-full flex">
        <div className="relative w-2/3 h-12">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search discounts by name or code..."
            className="w-full h-full pl-10 pr-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
        <div
          onClick={exportToExcel}
          className="h-[44px] w-[91px] ml-4 flex items-center justify-center text-lg cursor-pointer bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <div className="mr-2">
            <LuArrowUpRight />
          </div>
          <div>Export</div>
        </div>
        <div className="h-[44px] w-[44px] rounded-lg flex items-center justify-center text-lg ml-4 cursor-pointer bg-gray-200 hover:bg-gray-300">
          <IoMdAdd />
        </div>
      </div>
      <div className="w-full mt-4">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th
                className="p-4 text-left text-gray-600 cursor-pointer"
                onClick={() => handleSort("discount_name")}
              >
                Name <FaArrowDown className="ml-2 inline" />
              </th>
              <th className="p-4 text-left text-gray-600">Code</th>
              <th className="p-4 text-left text-gray-600">Status</th>
              <th className="p-4 text-left text-gray-600">Products</th>
              <th className="p-4 text-left text-gray-600">Amount</th>
              <th className="p-4 text-center text-gray-600">Redemptions</th>
              <th className="p-4 text-center text-gray-600">Options</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((discount, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4">
                  {discount.discount_name.length > 10
                    ? `${discount.discount_name.substring(0, 10)}...`
                    : discount.discount_name}
                </td>
                <td className="p-4">{discount.discount_code}</td>
                <td className="p-4 flex items-center">
                  {discount.discount_status === "active" && (
                    <>
                      <MdOutlineCheckCircle className="text-green-500 mr-2" />
                      Active
                    </>
                  )}
                  {discount.discount_status === "scheduled" && (
                    <>
                      <MdOutlineCheckCircle className="text-yellow-500 mr-2" />
                      Scheduled
                    </>
                  )}
                  {discount.discount_status === "draft" && (
                    <>
                      <MdOutlineCheckCircle className="text-gray-500 mr-2" />
                      Draft
                    </>
                  )}
                  {discount.discount_status === "expired" && (
                    <>
                      <MdOutlineCancel className="text-red-500 mr-2" />
                      Expired
                    </>
                  )}
                </td>
                <td className="p-4">
                  {discount.discount_applies_to === "all"
                    ? "All products"
                    : discount.discount_product_ids.length > 1
                    ? `${discount.discount_product_ids[0]} + ${
                        discount.discount_product_ids.length - 1
                      } more`
                    : discount.discount_product_ids[0]}
                </td>
                <td className="p-4">
                  {discount.discount_type === "percentage"
                    ? `${discount.discount_value}%`
                    : `${discount.discount_value} vnđ`}
                </td>
                <td className="p-4 text-center">
                  {discount.discount_uses_count}
                </td>
                <td className="p-4 text-center cursor-pointer relative">
                  <BsThreeDots className="text-gray-500" />
                  {/* Add your options menu here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-200 p-2 rounded disabled:bg-gray-400"
        >
          Prev
        </button>
        <div className="text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-gray-200 p-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableDiscount;
