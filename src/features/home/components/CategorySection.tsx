import Button from "../../../components/Button/Button";
import { useCategory } from "../../../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const { categories, canLoadMore, fetchCategories } = useCategory();

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
          <Button title="Load More" onClick={() => {
            fetchCategories();
          }} />
        </div>
      )}

    </section>
  );
}
