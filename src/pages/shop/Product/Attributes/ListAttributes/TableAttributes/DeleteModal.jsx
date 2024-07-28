import React from "react";
import { Modal, Button } from "@mui/material";

const DeleteModal = ({
  openDeleteModal,
  handleCloseDeleteModal,
  confirmDelete,
}) => (
  <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Xác nhận xóa thuộc tính</h2>
      <p>Bạn có chắc chắn muốn xóa thuộc tính này không?</p>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleCloseDeleteModal} className="mr-2">
          Hủy
        </Button>
        <Button variant="contained" color="secondary" onClick={confirmDelete}>
          Xóa
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteModal;
