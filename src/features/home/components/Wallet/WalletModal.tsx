import React from "react";
import { Modal } from "flowbite-react";
import WalletForm from "./WalletForm";
import { Wallet } from "../../../../models/wallet";

interface WalletModalProps {
  onClose: () => void;
  isOpen: boolean;
  initialValues?: Wallet;
}

const WalletModal: React.FC<WalletModalProps> = ({ onClose, isOpen, initialValues }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{initialValues ? "Edit Wallet" : "Add New Wallet"}</Modal.Header>
      <Modal.Body>
        <WalletForm initialValues={initialValues} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;
