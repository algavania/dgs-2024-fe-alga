import { Category } from "./category";

export interface ExpenseItem {
    _id: string;
    category?: Category | null;
    wallet: string;
    amount: number;
    title: string;
    flowType: string;
    createdAt: string;
    updatedAt: string;
  }
  