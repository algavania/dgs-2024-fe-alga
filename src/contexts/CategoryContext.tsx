// CategoryContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { Category } from '../models/category';
import {
  createCategory,
  updateCategory,
  listCategories,
  deleteCategory,
} from '../api/categoryApi';

type CategoryContextType = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: (page?: number, limit?: number) => void;
  addCategory: (name: string) => void;
  editCategory: (id: string, name: string) => void;
  removeCategory: (id: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await listCategories(page, limit);
      setCategories(response);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await createCategory(name);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (err) {
      setError('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing category
  const editCategory = async (id: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await updateCategory(id, name);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? updatedCategory : category
        )
      );
    } catch (err) {
      setError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const removeCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (err) {
      setError('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
