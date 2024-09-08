import { ExpenseItem } from '../models/expense-item';
import apiClient from './apiClient';

const endpoint = '/expense-items';

export const createExpense = async (name: string): Promise<ExpenseItem> => {
  const response = await apiClient.post<ExpenseItem>(endpoint, name);
  return response.data;
};

export const updateExpense = async (id: string, name: string): Promise<ExpenseItem> => {
  const response = await apiClient.put<ExpenseItem>(`${endpoint}/${id}`, name);
  return response.data;
};

export const listExpenses = async (page: number = 1, limit: number = 10): Promise<ExpenseItem[]> => {
  const response = await apiClient.get(`${endpoint}?page=${page}&limit=${limit}`);
  return response.data.data as ExpenseItem[];
};

export const showExpense = async (id: string): Promise<ExpenseItem> => {
  const response = await apiClient.get<ExpenseItem>(`${endpoint}/${id}`);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(`${endpoint}/${id}`);
};
