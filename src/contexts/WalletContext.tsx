// WalletContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { Wallet } from '../models/wallet';
import {
  createWallet,
  updateWallet,
  listWallets,
  deleteWallet,
} from '../api/walletApi';

type WalletContextType = {
  walletResponse: any; // Add response state for wallets
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
  fetchWallets: (page?: number, limit?: number) => void;
  addWallet: (name: string) => void;
  editWallet: (id: string, name: string) => void;
  removeWallet: (id: string) => void;
  canLoadMore: boolean;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletResponse, setWalletResponse] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallets = async (limit: number = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await listWallets(page, limit);
      setWalletResponse(response);
      if (response.page < response.totalPages) {
        setPage(page + 1);
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
      setWallets((prevWallets) => [...prevWallets, ...(response.data as Wallet[])]);
    } catch (err) {
      setError('Failed to fetch wallets');
    } finally {
      setLoading(false);
    }
  };

  const addWallet = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const newWallet = await createWallet(name);
      setWallets((prevWallets) => [...prevWallets, newWallet]);
    } catch (err) {
      setError('Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  const editWallet = async (id: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedWallet = await updateWallet(id, name);
      setWallets((prevWallets) =>
        prevWallets.map((wallet) => (wallet._id === id ? updatedWallet : wallet))
      );
    } catch (err) {
      setError('Failed to update wallet');
    } finally {
      setLoading(false);
    }
  };

  const removeWallet = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteWallet(id);
      setWallets((prevWallets) => prevWallets.filter((wallet) => wallet._id !== id));
    } catch (err) {
      setError('Failed to delete wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletResponse,
        wallets,
        loading,
        error,
        fetchWallets,
        addWallet,
        editWallet,
        removeWallet,
        canLoadMore,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
