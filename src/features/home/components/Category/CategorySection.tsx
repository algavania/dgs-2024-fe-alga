import { useEffect } from "react";
import { useCategory } from "../../../../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";
import Loading from "../../../../components/Loading/Loading";
import { useSnackbar } from "notistack";

export default function CategorySection() {
  const { categories, canLoadMore, fetchCategories, loading, error: categoryError } = useCategory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryError) {
      enqueueSnackbar(categoryError, { variant: "error" });
    }
  }, [categoryError, enqueueSnackbar]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-700 font-bold">Categories</h1>
        <div
          className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
        >
          Add
        </div>
      </div>

      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}

      {canLoadMore && (
        <div className="flex justify-center">
          <div
            className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
            onClick={() => {
              fetchCategories();
            }}
          >
            Load More
          </div>
        </div>
    )}
    </section>
  );
}
