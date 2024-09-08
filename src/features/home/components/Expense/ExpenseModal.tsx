import { Modal } from "flowbite-react";
import ExpenseForm from "./ExpenseForm";
import { ExpenseItem } from "../../../../models/expense-item";

export default function ExpenseModal({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ExpenseItem;
}) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add New Expense</Modal.Header>
      <Modal.Body>
        <ExpenseForm
          initialValues={initialValues}
          isEdit={initialValues != null}
          onClose={onClose}
        />
      </Modal.Body>
    </Modal>
  );
}
