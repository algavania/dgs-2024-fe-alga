import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useCategory } from "../../../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";
import Loading from "../../../components/Loading/Loading";
import { useSnackbar } from "notistack";
import { AddSquare } from "iconsax-react";

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
        <AddSquare size="32" color="#3b82f6" variant="Bold"/>
      </div>

      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}

      {canLoadMore && (
        <div className="flex justify-end">
          <Button
            title="Load More"
            onClick={() => {
              fetchCategories();
            }}
          />
        </div>
      )}
    </section>
  );
}
