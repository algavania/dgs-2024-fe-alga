import { Wallet } from '../models/wallet';
import apiClient from './apiClient';

const endpoint = '/wallets';

export const createWallet = async (name: string): Promise<Wallet> => {
  const response = await apiClient.post<Wallet>(endpoint, name);
  return response.data;
};

export const updateWallet = async (id: string, name: string): Promise<Wallet> => {
  const response = await apiClient.put<Wallet>(`${endpoint}/${id}`, name);
  return response.data;
};

export const listWallets = async (page: number = 1, limit: number = 10): Promise<any> => {
  const response = await apiClient.get(`${endpoint}?page=${page}&limit=${limit}`);
  return response.data;
};

export const showWallet = async (id: string): Promise<Wallet> => {
  const response = await apiClient.get<Wallet>(`${endpoint}/${id}`);
  return response.data;
};

export const deleteWallet = async (id: string): Promise<void> => {
  await apiClient.delete(`${endpoint}/${id}`);
};
