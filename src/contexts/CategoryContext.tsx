import { createContext, useState, useContext, ReactNode } from "react";
import { Category } from "../models/category";
import {
  createCategory,
  updateCategory,
  listCategories,
  deleteCategory,
} from "../api/categoryApi";

type CategoryResponse = {
  data: Category[];
  page: number;
  totalPages: number;
};

type CategoryContextType = {
  categoryResponse: CategoryResponse | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: (page?: number, limit?: number) => void;
  addCategory: (name: string, wallet: string) => void;
  editCategory: (id: string, name: string, wallet: string) => void;
  removeCategory: (id: string) => void;
  canLoadMore: boolean;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryResponse, setCategoryResponse] =
    useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (limit: number = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await listCategories(page, limit);
      if (page == 1) {
        setCategories([]);
      }
      setCategoryResponse(response);
      setCategories((prevCategories) => {
        const existingCategoryIds = new Set(
          prevCategories.map((category) => category._id)
        );
        const newCategories = response.data as Category[];
        return [
          ...prevCategories,
          ...newCategories.filter(
            (category) => !existingCategoryIds.has(category._id)
          ),
        ];
      });
      if (response.page < response.totalPages) {
        setPage(page + 1);
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string, wallet: string) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await createCategory(name, wallet);
      setCategories([newCategory]);
      setPage(1);
      await fetchCategories();
    } catch (err) {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id: string, name: string, wallet: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await updateCategory(id, name, wallet);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? updatedCategory : category
        )
      );
      setPage(1);
      await fetchCategories();
    } catch (err) {
      setError("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      setPage(1);
      await fetchCategories();
    } catch (err) {
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryResponse,
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        editCategory,
        removeCategory,
        canLoadMore,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
