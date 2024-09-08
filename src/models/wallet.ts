import { ExpenseItem } from "./expense-item";

export interface Wallet {
    _id: string;
    name: string;
    expenseItems: ExpenseItem[] | null,
    createdAt: string | null,
    updatedAt: string | null,
  }
  