// ExpenseContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { ExpenseItem } from "../models/expense-item";
import {
  createExpense,
  updateExpense,
  listExpenses,
  deleteExpense,
} from "../api/expenseApi";

type ExpenseContextType = {
  expenseResponse: any;
  expenses: ExpenseItem[];
  loading: boolean;
  error: string | null;
  fetchExpenses: (page?: number, limit?: number) => void;
  addExpense: (
    title: string,
    amount: number,
    wallet: string,
    category: string,
    flowType: string
  ) => void;
  editExpense: (
    id: string,
    title: string,
    amount: number,
    flowType: string,
    wallet?: string,
    category?: string
  ) => void;
  removeExpense: (id: string) => void;
  canLoadMore: boolean;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [expenseResponse, setExpenseResponse] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await listExpenses(page, limit);
      setExpenseResponse(response);
      if (response.page < response.totalPages) {
        setPage(page + 1);
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
      setExpenses((prevExpenses) => {
        const existingIds = new Set(prevExpenses.map((expense) => expense._id));
        const newExpenses = response.data as ExpenseItem[];
        return [
          ...prevExpenses,
          ...newExpenses.filter((expense) => !existingIds.has(expense._id)), // Only add new expenses
        ];
      });
    } catch (err) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  // Add new expense and reset pagination to fetch updated data
  const addExpense = async (
    title: string,
    amount: number,
    wallet: string,
    category: string,
    flowType: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await createExpense(title, amount, wallet, category, flowType);
      // Reset pagination and fetch expenses again
      setPage(1);
      setExpenses([]); // Clear previous expenses
      await fetchExpenses(1); // Fetch the first page after adding
    } catch (err) {
      setError("Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  // Edit expense and reset pagination to fetch updated data
  const editExpense = async (
    id: string,
    title: string,
    amount: number,
    flowType: string,
    wallet?: string,
    category?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await updateExpense(id, title, amount, flowType, wallet, category);
      // Reset pagination and fetch expenses again
      setPage(1);
      setExpenses([]); // Clear previous expenses
      await fetchExpenses(1); // Fetch the first page after updating
    } catch (err) {
      setError("Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  const removeExpense = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteExpense(id);
      // Reset pagination and fetch expenses again
      setPage(1);
      setExpenses([]); // Clear previous expenses
      await fetchExpenses(1); // Fetch the first page after deleting
    } catch (err) {
      setError("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenseResponse,
        expenses,
        loading,
        error,
        fetchExpenses,
        addExpense,
        editExpense,
        removeExpense,
        canLoadMore,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
