import { useState } from 'react';
import { Category } from '../models/category';
import {
  createCategory,
  updateCategory,
  listCategories,
  showCategory,
  deleteCategory,
} from '../api/categoryApi';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listCategories(page, limit);
      console.log('data test',data);
      setCategories(data);
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
      setCategories((prev) => [...prev, newCategory]);
    } catch (err) {
      setError('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await updateCategory(id, name);
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? updatedCategory : cat))
      );
    } catch (err) {
      setError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const category = await showCategory(id);
      return category;
    } catch (err) {
      setError('Failed to fetch category');
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      setError('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    getCategory,
    removeCategory,
  };
};

export default useCategories;
