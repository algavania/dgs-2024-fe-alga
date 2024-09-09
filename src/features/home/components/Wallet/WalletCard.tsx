import { useState } from "react";
import { Edit2, Trash, Wallet3 } from "iconsax-react";
import { Wallet } from "../../../../models/wallet";
import WalletDeleteModal from "./WalletDeleteModal";
import { useWallet } from "../../../../contexts/WalletContext";
import WalletModal from "./WalletModal";

export default function WalletCard({ wallet }: { wallet: Wallet }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeWallet, editWallet } = useWallet();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 items-center my-4">
        <div className="p-2 bg-violet-100 rounded-lg">
          <Wallet3 size="20" color="#8b5cf6" variant="Bold" />
        </div>
        <div className="font-medium text-gray-700 flex-1">{wallet.name}</div>
        <div className="flex gap-4">
          <div className="p-2 bg-blue-100 rounded-lg cursor-pointer" onClick={handleEditClick}>
            <Edit2 size="24" color="#3b82f6" />
          </div>
          <div className="p-2 bg-red-100 rounded-lg cursor-pointer" onClick={handleDeleteClick}>
            <Trash size="24" color="#ef4444" variant="Bold" />
          </div>
        </div>
      </div>

      <WalletModal
        isOpen={isEditModalOpen}
        initialValues={wallet}
        onClose={() => setIsEditModalOpen(false)}
      />

      <WalletDeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={() => {
          removeWallet(wallet._id);
          setIsDeleteModalOpen(false);
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
