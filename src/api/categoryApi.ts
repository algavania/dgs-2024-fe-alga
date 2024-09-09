import { Category } from "../models/category";
import apiClient from "./apiClient";

const endpoint = "/categories";

export const createCategory = async (name: string, wallet: string): Promise<Category> => {
  const response = await apiClient.post<Category>(endpoint, {
    name: name,
    wallet: wallet,
  });
  return response.data;
};

export const updateCategory = async (
  id: string,
  name: string,
  wallet: string,
): Promise<Category> => {
  const response = await apiClient.put<Category>(`${endpoint}/${id}`, {
    name: name,
    wallet: wallet,
  });
  return response.data;
};

export const listCategories = async (
  page: number = 1,
  limit: number = 10
): Promise<any> => {
  const response = await apiClient.get(
    `${endpoint}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const showCategory = async (id: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`${endpoint}/${id}`);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`${endpoint}/${id}`);
};
