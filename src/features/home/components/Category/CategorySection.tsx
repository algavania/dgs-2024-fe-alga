import { useEffect, useState } from "react";
import { useCategory } from "../../../../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";
import CategoryModal from "./CategoryModal";
import Loading from "../../../../components/Loading/Loading";
import { useSnackbar } from "notistack";

export default function CategorySection() {
  const { categories, canLoadMore, fetchCategories, loading, error: categoryError } = useCategory();
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex justify-between items-center">
        <h1 className="text-lg text-gray-700 font-bold">Categories</h1>
        <div
          className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg hover:bg-white hover:underline hover:shadow-sm cursor-pointer transition"
          onClick={() => setIsModalOpen(true)}
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
