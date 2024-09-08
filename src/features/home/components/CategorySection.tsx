import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useCategory } from "../../../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";
import Loading from "../../../components/Loading/Loading";
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
        <h1>Categories</h1>
        <Button title="Add" onClick={() => {}} />
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
