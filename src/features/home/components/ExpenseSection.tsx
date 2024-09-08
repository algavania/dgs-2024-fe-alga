import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { useExpense } from "../../../contexts/ExpenseContext";
import { getCurrentFormattedDate } from "../../../utils/dateFormatter";
import ExpenseCard from "./ExpenseCard";
import Loading from "../../../components/Loading/Loading";
import { useSnackbar } from "notistack";
import { Add } from "iconsax-react";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseSection() {
  const {
    expenses,
    expenseResponse,
    canLoadMore,
    fetchExpenses,
    loading,
    error: expenseError,
  } = useExpense();
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (expenseError) {
      enqueueSnackbar(expenseError, { variant: "error" });
    }
  }, [expenseError, enqueueSnackbar]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 inline-flex items-center shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Add size="32" color="white" />
      </button>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-700">{getCurrentFormattedDate()}</h2>
        <p className="text-sm font-medium text-slate-600">
          Number of transactions: {expenses.length}
        </p>
      </div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} />
      ))}

      {canLoadMore && (
        <div className="flex justify-center">
          <div
            className="text-sm font-medium text-blue-700 px-8 py-4 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
            onClick={() => {
              fetchExpenses();
            }}
          >
            Load More
          </div>
        </div>
      )}
    </div>
  );
}
