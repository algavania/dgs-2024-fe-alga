import Button from "../../../components/Button/Button";
import { useExpense } from "../../../contexts/ExpenseContext";
import { getCurrentFormattedDate } from "../../../utils/dateFormatter";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseSection() {
  const { expenses, expenseResponse, canLoadMore, fetchExpenses } = useExpense();

  return (
    <div>
      <div className="flex justify-between">
        <h2>{getCurrentFormattedDate()}</h2>
        <p>Number of transaction: {expenseResponse.total}</p>
      </div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} />
      ))}

      {canLoadMore && (
        <div className="flex justify-end">
          <Button title="Load More" onClick={() => {
            fetchExpenses();
          }} />
        </div>
      )}
    </div>
  );
}
