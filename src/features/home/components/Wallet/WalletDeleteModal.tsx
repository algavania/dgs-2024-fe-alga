import { Modal } from "flowbite-react";

interface WalletDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function WalletDeleteModal({
  isOpen,
  onClose,
  onDelete,
}: WalletDeleteModalProps) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Confirm Deletion</Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this wallet?</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
