import type {
  CategoryCard,
  DiscountPrice,
  ProductCategoriesInterface,
} from './interfaces';
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

export function getDiscount(
  discounts: DiscountPrice[],
  productCategories: ProductCategoriesInterface[]
): number {
  const productDiscount = discounts.find((discount) => {
    const discountCategories = new Set(
      discount.category
        ?.match(/"([^"]+)"/g)
        ?.map((id) => id.replaceAll('"', '').trim())
    );

    return productCategories.some((cat) => discountCategories.has(cat.id));
  });
  return productDiscount ? productDiscount.value : 0;
}
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

interface CategoryWithParent {
  category: NestedCategory | undefined;
  parent: NestedCategory | undefined;
}

export const findCategoryById = (
  categoryId: string,
  categories: NestedCategory[]
): CategoryWithParent => {
  const mainCategory = categories.find((cat) => cat.id === categoryId);
  if (mainCategory) {
    return { category: mainCategory, parent: undefined };
  }

  for (const category of categories) {
    const subCategory = category.children?.find(
      (child) => child.id === categoryId
    );
    if (subCategory) {
      return { category: subCategory, parent: category };
    }
  }
  return { category: undefined, parent: undefined };
};

export const getSubCategories = (
  currentCategory: NestedCategory | undefined,
  parentCategory: NestedCategory | undefined
): NestedCategory[] => {
  if (parentCategory?.children) {
    return parentCategory.children;
  }

  if (currentCategory?.children) {
    return currentCategory.children;
  }

  return [];
};

export const shouldShowSubCategories = (
  selectedCategory: string,
  currentCategory: NestedCategory | undefined,
  parentCategory: NestedCategory | undefined
): boolean => {
  return Boolean(
    selectedCategory !== 'all' &&
      ((currentCategory?.children && currentCategory.children.length > 0) ||
        (parentCategory?.children && parentCategory.children.length > 0))
  );
};
