import { useCategory } from "../../../../contexts/CategoryContext";
import { useWallet } from "../../../../contexts/WalletContext";
import { useExpense } from "../../../../contexts/ExpenseContext";
import { ExpenseItem } from "../../../../models/expense-item";

interface ExpenseFormProps {
  initialValues?: ExpenseItem;
  isEdit?: boolean;
  onClose: () => void; // Callback to close the form after submission
}

export default function ExpenseForm({
  initialValues,
  isEdit = false,
  onClose,
}: ExpenseFormProps) {
  const {
    categories,
    loading: categoryLoading,
    canLoadMore: canLoadMoreCategories,
    fetchCategories,
  } = useCategory();

  const {
    wallets,
    loading: walletLoading,
    fetchWallets,
    canLoadMore: canLoadMoreWallets,
  } = useWallet();

  const { addExpense, editExpense } = useExpense();

  const handleLoadMoreCategories = () => {
    fetchCategories();
  };

  const handleLoadMoreWallets = () => {
    fetchWallets();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const walletId = formData.get("wallet") as string;
    const categoryId = formData.get("category") as string;
    const flowType = formData.get("flowType") as "income" | "outcome";

    if (isEdit && initialValues) {
      // Use form values to update the expense
      editExpense(
        initialValues._id!,
        title,  // Use form value
        amount, // Use form value
        flowType, // Use form value
        walletId, // Use form value
        categoryId // Use form value
      );
    } else {
      // Use form values to create a new expense
      addExpense(title, amount, walletId, categoryId, flowType);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={isEdit ? initialValues?.title : ""}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          defaultValue={isEdit ? initialValues?.amount : 0}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
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
                selected={isEdit && wallet._id === initialValues?.wallet?._id}
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categoryLoading ? (
            <option disabled>Loading...</option>
          ) : (
            categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                selected={isEdit && category._id === initialValues?.category?._id}
              >
                {category.name}
              </option>
            ))
          )}
        </select>
        {canLoadMoreCategories && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleLoadMoreCategories}
              className="mt-2 text-blue-600 hover:underline"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Flow Type
        </label>
        <select
          name="flowType"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          required
        >
          <option
            value="income"
            selected={isEdit && initialValues?.flowType === "income"}
          >
            Income
          </option>
          <option
            value="outcome"
            selected={isEdit && initialValues?.flowType === "outcome"}
          >
            Outcome
          </option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
