import { Category } from "./category";
import { Wallet } from "./wallet";

export interface ExpenseItem {
    _id: string;
    category?: Category | null;
    wallet?: Wallet;
    amount: number;
    title: string;
    flowType: string;
    createdAt: string;
    updatedAt: string;
  }
  