import Button from "../../../components/Button/Button";
import { ExpenseItem } from "../../../models/expense-item";
import { formatRupiah } from "../../../utils/currencyFormatter";
import { formatDate } from "../../../utils/dateFormatter";

export default function ExpenseCard({ expense }: { expense: ExpenseItem }) {
  return (
    <div className="p-6 w-full my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid grid-cols-4">
        <div>{expense.flowType}</div>
        <div>
            <p>{expense.category?.name ?? 'Expense'}</p>
            <p>{formatDate(expense.createdAt)}</p>
        </div>
        <div>{formatRupiah(expense.amount)}</div>
        <Button title="Delete" onClick={() => {}}/>
      </div>
    </div>
  );
}
