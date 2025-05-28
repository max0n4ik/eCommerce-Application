import type { CategoryCard } from './interfaces';
import type { NestedCategory } from './types';

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
export function nestCategories(categories: CategoryCard[]): NestedCategory[] {
  const map = new Map<string, NestedCategory>();
  const roots: NestedCategory[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  categories.forEach((cat) => {
    const current = map.get(cat.id);
    if (!current) return;
    if (cat.parent && map.has(cat.parent.id)) {
      const parent = map.get(cat.parent.id);
      if (!parent) return;
      parent.children.push(current);
    } else {
      roots.push(current);
    }
  });

  return roots;
}
