import { ExpenseItem } from "../models/expense-item";
import apiClient from "./apiClient";

const endpoint = "/expense-items";

export const createExpense = async (
  title: string,
  amount: number,
  wallet: string,
  category: string,
  flowType: string,
): Promise<ExpenseItem> => {
  const response = await apiClient.post<ExpenseItem>(endpoint, {
    title: title,
    amount: amount,
    wallet: wallet,
    flowType: flowType,
    category: category,
  });
  return response.data;
};

export const updateExpense = async (
  id: string,
  title: string,
  amount: number,
  flowType: string,
  wallet?: string,
  category?: string,
): Promise<ExpenseItem> => {
  const response = await apiClient.put<ExpenseItem>(`${endpoint}/${id}`, {
    title: title,
    amount: amount,
    wallet: wallet,
    flowType: flowType,
    category: category,
  });
  return response.data;
};

export const listExpenses = async (
  page: number = 1,
  limit: number = 10
): Promise<any> => {
  const response = await apiClient.get(
    `${endpoint}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const showExpense = async (id: string): Promise<ExpenseItem> => {
  const response = await apiClient.get<ExpenseItem>(`${endpoint}/${id}`);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(`${endpoint}/${id}`);
};
