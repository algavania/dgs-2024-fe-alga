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
        <h2>{getCurrentFormattedDate()}</h2>
        <p>Number of transactions: {expenseResponse?.total || 0}</p>
      </div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} />
      ))}

      {canLoadMore && (
        <div className="flex justify-end">
          <Button
            title="Load More"
            onClick={() => {
              fetchExpenses();
            }}
          />
        </div>
      )}
    </div>
  );
}
