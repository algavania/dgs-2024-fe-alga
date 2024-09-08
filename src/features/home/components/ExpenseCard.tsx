import { DirectDown, DirectUp } from "iconsax-react";
import Button from "../../../components/Button/Button";
import { ExpenseItem } from "../../../models/expense-item";
import { formatRupiah } from "../../../utils/currencyFormatter";
import { formatDate } from "../../../utils/dateFormatter";

export default function ExpenseCard({ expense }: { expense: ExpenseItem }) {
  let icon;
  let nominal;
  if (expense.flowType === 'outcome') {
    icon = <div className="p-2 bg-orange-100 rounded-lg">
      <DirectUp size="20" color="#f97316" variant="Bold"/>
    </div>
    nominal = <div className="text-orange-600 font-semibold">
      {`-${formatRupiah(expense.amount)}`}
    </div>
  } else {
    icon = <div className="p-2 bg-emerald-100 rounded-lg">
      <DirectDown size="20" color="#10b981" variant="Bold"/>
    </div>
    nominal = <div className="text-emerald-600 font-semibold">
      {`-${formatRupiah(expense.amount)}`}
    </div>  
  }

  return (
    <div className="px-8 py-6 w-full my-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-12">
        <div className="flex flex-1 gap-4 items-center">
          {icon}
          <div>
              <p className="font-bold text-gray-700">{expense.category?.name ?? 'Expense'}</p>
              <p className="text-sm font-medium text-slate-400">{formatDate(expense.createdAt)}</p>
          </div>
        </div>
        {nominal}
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 22H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75ZM19.02 3.482c-1.94-1.94-3.84-1.99-5.83 0l-1.21 1.21c-.1.1-.14.26-.1.4a8.129 8.129 0 0 0 5.53 5.53.4.4 0 0 0 .41-.1l1.2-1.21c.99-.98 1.47-1.93 1.47-2.89.01-.99-.47-1.95-1.47-2.94ZM15.61 11.53c-.29-.14-.57-.28-.84-.44a8.8 8.8 0 0 1-.64-.42c-.17-.11-.37-.27-.56-.43a1.22 1.22 0 0 1-.17-.15c-.33-.28-.7-.64-1.03-1.04-.03-.02-.08-.09-.15-.18-.1-.12-.27-.32-.42-.55a5.49 5.49 0 0 1-.39-.59c-.16-.27-.3-.54-.44-.82a6.88 6.88 0 0 1-.061-.135c-.148-.333-.583-.43-.84-.173L4.34 12.331c-.13.13-.25.38-.28.55l-.54 3.83c-.1.68.09 1.32.51 1.75.36.35.86.54 1.4.54.12 0 .24-.01.36-.03l3.84-.54c.18-.03.43-.15.55-.28l5.722-5.721c.26-.26.161-.705-.176-.85a26.852 26.852 0 0 1-.116-.05Z" fill="#3b82f6"></path></svg>
          </div>
          <div className="p-2 bg-red-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82ZM19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Zm-5.57 9.61h-3.33c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75Zm.84-4h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="#ef4444"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
