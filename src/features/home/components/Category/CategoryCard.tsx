import { Category2 } from "iconsax-react";
import { Category } from "../../../../models/category";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex gap-2 items-center my-4">
      <div className="p-2 bg-violet-100 rounded-lg">
        <Category2 size="20" color="#8b5cf6" variant="Bold"/>
      </div>
      <div className="font-medium text-gray-700">{category.name}</div>
    </div>    
  );
}
