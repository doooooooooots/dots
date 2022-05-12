import { CATEGORIES } from '../enums/categories';

export default function getCategoryId(categoryName) {
  const category = CATEGORIES.find((item) => item.name === categoryName);
  if (category) return category.id;
  return null;
}
