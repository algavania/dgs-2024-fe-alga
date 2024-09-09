import React from "react";
import { Modal } from "flowbite-react";
import CategoryForm from "./CategoryForm";
import { Category } from "../../../../models/category";

interface CategoryModalProps {
  onClose: () => void;
  isOpen: boolean;
  initialValues?: Category;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onClose, isOpen, initialValues }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{initialValues ? "Edit Category" : "Add New Category"}</Modal.Header>
      <Modal.Body>
        <CategoryForm initialValues={initialValues} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
