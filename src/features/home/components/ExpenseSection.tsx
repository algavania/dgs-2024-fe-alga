import { ExpenseItem } from "../../../models/expense-item";
import { getCurrentFormattedDate } from "../../../utils/dateFormatter";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseSection({
  expenses,
  expenseResponse,
}: {
  expenses: ExpenseItem[];
  expenseResponse: any,
}) {
  return (
    <div>
      <div className="flex justify-between">
        <h2>{getCurrentFormattedDate()}</h2>
        <p>Number of transaction: {expenseResponse.total}</p>
      </div>

      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} />
      ))}
    </div>
  );
}
