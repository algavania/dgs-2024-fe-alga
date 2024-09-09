import { useState } from "react";
import { TextInput } from "flowbite-react";
import { useCategory } from "../../../../contexts/CategoryContext";
import { useWallet } from "../../../../contexts/WalletContext";
import { Category } from "../../../../models/category";

interface CategoryFormProps {
  initialValues?: Category;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  onClose,
}) => {
  const { addCategory, editCategory } = useCategory();
  const {
    wallets,
    loading: walletLoading,
    fetchWallets,
    canLoadMore: canLoadMoreWallets,
  } = useWallet();
  const [name, setName] = useState(initialValues ? initialValues.name : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const walletId = formData.get("wallet") as string;

    if (initialValues) {
      editCategory(initialValues._id!, name, walletId);
    } else {
      addCategory(name, walletId);
    }
    onClose();
  };

  const handleLoadMoreWallets = () => {
    fetchWallets();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="category-name"
          className="block text-sm font-medium text-gray-700"
        >
          Category Name
        </label>
        <TextInput
          id="category-name"
          type="text"
          className="my-3"
          name="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Wallet
        </label>
        <select
          name="wallet"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          required
        >
          <option value="">Select Wallet</option>
          {walletLoading ? (
            <option disabled>Loading...</option>
          ) : (
            wallets.map((wallet) => (
              <option
                key={wallet._id}
                value={wallet._id}
                selected={
                  initialValues != null &&
                  wallet._id === initialValues?.wallet?._id
                }
              >
                {wallet.name}
              </option>
            ))
          )}
        </select>
        {canLoadMoreWallets && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleLoadMoreWallets}
              className="mt-2 text-blue-600 hover:underline"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {initialValues ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
