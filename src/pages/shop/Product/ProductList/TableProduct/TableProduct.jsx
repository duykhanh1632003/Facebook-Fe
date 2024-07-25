import React, { useState, useEffect } from "react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IoSwapVertical } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import "./TableProduct.css";
import generateProducts from "../../../../../util/util";

const TableProduct = () => {
  const [products, setProducts] = useState(generateProducts());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = generateProducts().filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(generateProducts());
    }
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "default";
      setSortConfig({ key: null, direction: "asc" });
      return;
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (id, status) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, status } : product
    );
    setProducts(updatedProducts);
  };

  const currentData = sortedProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full bg-white dark:bg-gray-800 mt-3 rounded-lg p-3">
      <div className="font-bold text-lg mb-4 dark:text-white">
        Your Products
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-[400px] p-2 mb-4 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg"
      />
      <TableContainer component={Paper} className="dark:bg-gray-800">
        <Table>
          <TableHead className="header">
            <TableRow>
              <TableCell className="header-cell">ID</TableCell>
              <TableCell className="header-cell">Thumbnail</TableCell>
              <TableCell
                onClick={() => handleSort("name")}
                className="header-cell cursor-pointer"
              >
                Name & Description
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("rating")}
                className="header-cell cursor-pointer"
              >
                Rating
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("price")}
                className="header-cell cursor-pointer"
              >
                Price
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("purchases")}
                className="header-cell cursor-pointer"
              >
                Purchases
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("totalRevenue")}
                className="header-cell cursor-pointer"
              >
                Total Revenue
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("status")}
                className="header-cell cursor-pointer"
              >
                Status
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell className="header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((product, index) => (
              <TableRow
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-[#FFFFFF]"
                }`}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    {product.name.length > 22
                      ? `${product.name.substring(0, 22)}...`
                      : product.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.description.length > 22
                      ? `${product.description.substring(0, 22)}...`
                      : product.description}
                  </div>
                </TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.purchases}</TableCell>
                <TableCell>${product.totalRevenue}</TableCell>
                <TableCell>
                  <div
                    className={`status-indicator ${product.status}`}
                    onClick={() =>
                      handleStatusChange(
                        product.id,
                        product.status === "public" ? "draft" : "public"
                      )
                    }
                  >
                    {product.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="action-icon text-sm text-purple-600 cursor-pointer bg-[#EBCEF0]">
                    <FaEye />
                  </div>
                  <div className="action-icon text-sm text-green-500 cursor-pointer bg-[#C7E2D3]">
                    <FaPencilAlt />
                  </div>
                  <div className="action-icon text-sm text-red-500 cursor-pointer bg-[#F2C5CC]">
                    <FaTrashAlt />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(products.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4"
      />
    </div>
  );
};

export default TableProduct;
