import React from "react";
import { Modal, TextField, Button } from "@mui/material";

const EditModal = ({
  openEditModal,
  handleCloseEditModal,
  editedValue,
  setEditedValue,
  handleSave,
}) => (
  <Modal open={openEditModal} onClose={handleCloseEditModal}>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Edit Attribute</h2>
      <TextField
        label="Value"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <div className="mt-4 flex justify-end">
        <Button onClick={handleCloseEditModal} className="mr-2">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  </Modal>
);

export default EditModal;
