import { Category } from "../../../models/category";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex gap-2">
      <div>Icon</div>
      <div>{category.name}</div>
    </div>
  );
}
