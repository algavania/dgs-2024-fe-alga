import { ExpenseItem } from "../../../models/expense-item";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseSection({expenses} : {expenses: ExpenseItem[]}) {
    return (
        <div>
            {expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense}/>
          ))}
        </div>
    );
}