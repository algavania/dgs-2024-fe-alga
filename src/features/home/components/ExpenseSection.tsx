import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useExpense } from "../../../contexts/ExpenseContext";
import { getCurrentFormattedDate } from "../../../utils/dateFormatter";
import ExpenseCard from "./ExpenseCard";
import Loading from "../../../components/Loading/Loading";
import { useSnackbar } from "notistack";

export default function ExpenseSection() {
  const { expenses, expenseResponse, canLoadMore, fetchExpenses, loading, error: expenseError } = useExpense();
  const { enqueueSnackbar } = useSnackbar();

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
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-700">{getCurrentFormattedDate()}</h2>
        <p className="text-sm font-medium text-slate-600">Number of transactions: {expenseResponse?.total || 0}</p>
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
