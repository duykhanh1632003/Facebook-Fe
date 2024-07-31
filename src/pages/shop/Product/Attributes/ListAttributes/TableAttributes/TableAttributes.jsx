import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import TableHeader from "./TableHeader";
import AttributeRow from "./AttributeRow";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useProductContext } from "../../../../../../context/ProductContext";

const TableAttributes = () => {
  const {
    attributes,
    setAttributes,
    originalAttributes,
    setOriginalAttributes,
    loading,
  } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const filteredAttributes = originalAttributes.filter((attribute) =>
        attribute.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAttributes(filteredAttributes);
    } else {
      setAttributes(originalAttributes);
    }
  }, [searchQuery, originalAttributes]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (attribute) => {
    setSelectedAttribute(attribute);
    setEditedValue(attribute.value);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSave = async () => {
    if (!selectedAttribute) return;

    const updatedAttribute = { ...selectedAttribute, value: editedValue };

    try {
      const response = await instance.put(
        `/api/update/attribute/${selectedAttribute._id}`,
        updatedAttribute
      );

      if (response && response.data) {
        setAttributes((prevAttributes) =>
          prevAttributes.map((attr) =>
            attr._id === updatedAttribute._id ? updatedAttribute : attr
          )
        );
        setOriginalAttributes((prevOriginalAttributes) =>
          prevOriginalAttributes.map((attr) =>
            attr._id === updatedAttribute._id ? updatedAttribute : attr
          )
        );
        setOpenEditModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteClick = (attribute) => {
    setSelectedAttribute(attribute);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!selectedAttribute) return;

    try {
      const response = await instance.delete(
        `/api/delete/attribute/${selectedAttribute._id}`
      );

      if (response && response.data) {
        setAttributes((prevAttributes) =>
          prevAttributes.filter((attr) => attr._id !== selectedAttribute._id)
        );
        setOriginalAttributes((prevOriginalAttributes) =>
          prevOriginalAttributes.filter(
            (attr) => attr._id !== selectedAttribute._id
          )
        );
        setOpenDeleteModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentAttributes = attributes.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="bg-white mt-5 p-4 rounded-lg">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-text">Loading...</div>
        </div>
      )}
      <TableHeader
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-[#F2F2F2]">
            <TableRow className="h-[60px] bg-[#F2F2F2]">
              <TableCell>Category</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAttributes.map((attribute, index) => (
              <AttributeRow
                key={attribute._id}
                attribute={attribute}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mt-4">
        <Pagination
          className="mt-4"
          count={Math.ceil(attributes.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      <EditModal
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
        editedValue={editedValue}
        setEditedValue={setEditedValue}
        handleSave={handleSave}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default TableAttributes;
