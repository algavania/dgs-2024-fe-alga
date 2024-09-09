import { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import { useSnackbar } from "notistack";
import ExpenseModal from "./ExpenseModal";
import { useExpense } from "../../../../contexts/ExpenseContext";
import Loading from "../../../../components/Loading/Loading";
import { getCurrentFormattedDate } from "../../../../utils/dateFormatter";

export default function ExpenseSection() {
  const {
    expenses,
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
    <div className="relative pb-16">
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-700">{getCurrentFormattedDate()}</h2>
        <div className="flex gap-4 items-center">
          <p className="text-sm font-medium text-slate-600">
            Number of transactions: {expenses.length}
          </p>
          <div
            className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-blue-700 hover:underline hover:shadow-sm cursor-pointer transition"
            onClick={() => setIsModalOpen(true)}
          >
            Add
          </div>
        </div>
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
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
