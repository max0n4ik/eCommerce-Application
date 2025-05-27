import type { CategoryCard } from './interfaces';

export const getCategoryName = (
  categoryId: string,
  categories: CategoryCard[]
): string => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : 'Категория не найдена';
};

export const formatPrice = (price: number): string => {
  return price.toString().replace(/(\d{2})$/, '.$1');
};
export const getDiscountedPrice = (
  price: number,
  permyriad: number = 0
): number => {
  return (price * (10000 - permyriad)) / 10000;
};
