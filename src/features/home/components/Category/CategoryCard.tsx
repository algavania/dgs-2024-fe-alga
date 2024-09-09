import { useState } from "react";
import { Edit2, Trash, Category2 } from "iconsax-react";
import { Category } from "../../../../models/category";
import CategoryDeleteModal from "./CategoryDeleteModal";
import CategoryModal from "./CategoryModal";
import { useCategory } from "../../../../contexts/CategoryContext";

export default function CategoryCard({ category }: { category: Category }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeCategory } = useCategory();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 items-center my-4">
        <div className="p-2 bg-violet-100 rounded-lg">
          <Category2 size="20" color="#8b5cf6" variant="Bold" />
        </div>
        <div className="font-medium text-gray-700 flex-1">{category.name}</div>
        <div className="flex gap-4">
          <div className="p-2 bg-blue-100 rounded-lg cursor-pointer" onClick={handleEditClick}>
            <Edit2 size="24" color="#3b82f6" />
          </div>
          <div className="p-2 bg-red-100 rounded-lg cursor-pointer" onClick={handleDeleteClick}>
            <Trash size="24" color="#ef4444" variant="Bold" />
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isEditModalOpen}
        initialValues={category}
        onClose={() => setIsEditModalOpen(false)}
      />

      <CategoryDeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={() => {
          removeCategory(category._id);
          setIsDeleteModalOpen(false);
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
