import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IconButton, TableCell, TableRow } from "@mui/material";

const AttributeRow = ({
  attribute,
  handleEditClick,
  handleDeleteClick,
  index,
}) => (
  <TableRow
    key={attribute._id}
    className={`h-[45px] mb-2 ${
      index % 2 === 0 ? "bg-[#F7FAFC]" : "bg-white"
    } rounded-lg dark:text-white`}
  >
    <TableCell>{attribute.category}</TableCell>
    <TableCell align="center">{attribute.value}</TableCell>
    <TableCell align="right">
      <IconButton
        className="action-icon w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-1"
        onClick={() => handleEditClick(attribute)}
      >
        <FaPencilAlt className="text-green-500" />
      </IconButton>
      <IconButton
        className="action-icon w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center m-1"
        onClick={() => handleDeleteClick(attribute)}
      >
        <FaTrashAlt className="text-red-500" />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default AttributeRow;
