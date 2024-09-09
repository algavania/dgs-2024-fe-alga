import { useState } from "react";
import { TextInput } from "flowbite-react";
import { useWallet } from "../../../../contexts/WalletContext";
import { Wallet } from "../../../../models/wallet";

interface WalletFormProps {
  initialValues?: Wallet;
  onClose: () => void;
}

const WalletForm: React.FC<WalletFormProps> = ({ initialValues, onClose }) => {
  const { addWallet, editWallet } = useWallet();
  const [name, setName] = useState(initialValues ? initialValues.name : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialValues) {
      editWallet(initialValues._id!, name);
    } else {
      addWallet(name);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="wallet-name" className="block text-sm font-medium text-gray-700">
          Wallet Name
        </label>
        <TextInput
          id="wallet-name"
          type="text"
          className="my-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {initialValues ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default WalletForm;
