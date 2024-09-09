import { useState } from "react";
import { DirectDown, DirectUp, Edit2, Trash } from "iconsax-react";
import { ExpenseItem } from "../../../../models/expense-item";
import { formatRupiah } from "../../../../utils/currencyFormatter";
import { formatDate } from "../../../../utils/dateFormatter";
import ExpenseModal from "./ExpenseModal";
import ExpenseDeleteModal from "./ExpenseDeleteModal";
import { useExpense } from "../../../../contexts/ExpenseContext";

export default function ExpenseCard({ expense }: { expense: ExpenseItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    removeExpense,
  } = useExpense();

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  let icon;
  let nominal;

  if (expense.flowType === "outcome") {
    icon = (
      <div className="p-2 bg-orange-100 rounded-lg">
        <DirectUp size="20" color="#f97316" variant="Bold" />
      </div>
    );
    nominal = (
      <div className="text-orange-600 font-semibold">
        {`-${formatRupiah(expense.amount)}`}
      </div>
    );
  } else {
    icon = (
      <div className="p-2 bg-emerald-100 rounded-lg">
        <DirectDown size="20" color="#10b981" variant="Bold" />
      </div>
    );
    nominal = (
      <div className="text-emerald-600 font-semibold">
        {`+${formatRupiah(expense.amount)}`}
      </div>
    );
  }

  return (
    <>
      <div
        className="px-8 py-6 w-full my-4 bg-white border hover:bg-gray-100 border-gray-200 rounded-lg shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-12">
          <div className="flex flex-1 gap-4 items-center">
            {icon}
            <div>
              <p className="font-bold text-gray-700">
                {expense.category?.name ?? "Expense"}
              </p>
              <p className="text-sm font-medium text-slate-400">
                {formatDate(expense.createdAt)}
              </p>
            </div>
          </div>
          {nominal}
          <div className="flex gap-4 items-center">
            <div
              className="p-2 bg-blue-100 rounded-lg"
              onClick={handleCardClick}
            >
              <Edit2 size="24" color="#3b82f6"/>
            </div>
            <div
              className="p-2 bg-red-100 rounded-lg"
              onClick={handleDeleteClick} 
            >
              <Trash size="24" color="#ef4444" variant="Bold"/>
            </div>
          </div>
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        initialValues={expense}
        onClose={() => setIsModalOpen(false)}
      />

      <ExpenseDeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          removeExpense(expense._id);
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
