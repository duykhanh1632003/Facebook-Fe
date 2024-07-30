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
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./TableProduct.css";
import { useProductContext } from "../../../../../context/ProductContext";
import { axiosHaveAuth } from "../../../../../util/axios";
import { toast } from "react-toastify";

const TableProduct = () => {
  const { productData, loading, setProductData } = useProductContext();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const instance = axiosHaveAuth();

  useEffect(() => {
    if (productData && productData.length > 0) {
      setProducts(productData);
    } else {
      setProducts([]);
    }
  }, [productData]);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = productData.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(productData);
    }
  }, [searchQuery, productData]);

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

  const handleStatusChange = async (id, status) => {
    try {
      const res = await instance.post(`/api/change/status/${id}`);
      if (!res) {
        toast.error("Cannot change status");
      } else {
        toast.success("Status changed successfully");
      }
    } catch (e) {
      console.log(e);
    }
    const updatedProducts = products.map((product) =>
      product._id === id ? { ...product, status } : product
    );

    setProductData(updatedProducts);
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = async () => {
    try {
      await instance.delete(`/api/delete/product/${selectedProductId}`);
      toast.success("Product deleted successfully");
      const updatedProducts = products.filter(
        (product) => product._id !== selectedProductId
      );
      setProductData(updatedProducts);
      setProducts(updatedProducts);
      setOpenDeleteModal(false);
    } catch (e) {
      toast.error("Error deleting product");
      console.log(e);
    }
  };

  const currentData =
    rowsPerPage > 10 && sortedProducts.length < rowsPerPage
      ? sortedProducts
      : sortedProducts.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        );

  return (
    <div className="w-full bg-white dark:bg-gray-800 mt-3 rounded-lg p-3 relative">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-text">Loading...</div>
        </div>
      )}
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
                onClick={() => handleSort("product_name")}
                className="header-cell cursor-pointer"
              >
                Name & Description
                <IoSwapVertical className="inline ml-1" />
              </TableCell>
              <TableCell
                onClick={() => handleSort("product_ratingsAverage")}
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
                onClick={() => handleSort("orders_count")}
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
                key={product._id}
                className={`${
                  index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-[#FFFFFF]"
                }`}
              >
                <TableCell>
                  {product._id.length > 5
                    ? product._id.slice(0, 5)
                    : product._id}
                </TableCell>
                <TableCell>
                  <img
                    src={product.product_thumb}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    {product.product_name.length > 22
                      ? `${product.product_name.substring(0, 22)}...`
                      : product.product_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.product_description &&
                    product.product_description.length > 22
                      ? `${product.product_description.substring(0, 22)}...`
                      : product.product_description}
                  </div>
                </TableCell>
                <TableCell>{product.product_ratingsAverage}</TableCell>
                <TableCell>
                  {product.priceMax === product.priceMin
                    ? product.priceMax
                    : `${product.priceMin} - ${product.priceMax} `}
                  vnd
                </TableCell>
                <TableCell>{product.orders_count}</TableCell>
                <TableCell>{product.total} vnd</TableCell>
                <TableCell>
                  <div
                    className={`status-indicator ${product.status}`}
                    onClick={() =>
                      handleStatusChange(
                        product._id,
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
                  <div
                    className="action-icon text-sm text-red-500 cursor-pointer bg-[#F2C5CC]"
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <FaTrashAlt />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        color="primary"
        count={Math.ceil(products.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4 ml-[900px]"
      />

      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableProduct;
