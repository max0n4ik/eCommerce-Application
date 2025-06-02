import type { ProductCardI } from './interfaces';
import type { NestedCategory } from './types';

interface FilterOptions {
  priceRange: { min: number; max: number } | null;
  attributes: Record<string, string[]>;
}

interface UrlParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minHeight?: string;
  maxHeight?: string;
}

export function filterProducts(
  products: ProductCardI[],
  selectedCategory: string,
  filters: FilterOptions
): ProductCardI[] {
  return products.filter((product) => {
    if (
      selectedCategory !== 'all' &&
      !product.category?.some((cat) => cat.id === selectedCategory)
    ) {
      return false;
    }

    if (filters.priceRange) {
      const rawPrice = product.salePrice || product.price;
      const price =
        typeof rawPrice === 'string'
          ? Number.parseFloat(rawPrice) / 100
          : rawPrice / 100;

      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }
    }

    if (Object.keys(filters.attributes).length > 0) {
      const passedAttributes = Object.entries(filters.attributes).every(
        ([key, values]) => {
          if (key === 'height') {
            const heightRange = values[0].split('-').map(Number);
            const heightAttribute = product.attributes?.find(
              (attr) => attr.name === 'height'
            );
            if (!heightAttribute) {
              return false;
            }
            const height = Number(heightAttribute.value);
            return height >= heightRange[0] && height <= heightRange[1];
          }
          return true;
        }
      );

      if (!passedAttributes) {
        return false;
      }
    }

    return true;
  });
}

export function initializeFiltersFromUrl(
  params: UrlParams,
  currentFilters: FilterOptions
): FilterOptions {
  const newFilters = { ...currentFilters };

  if (params.minPrice || params.maxPrice) {
    newFilters.priceRange = {
      min: Number(params.minPrice) || 0,
      max: Number(params.maxPrice) || 300,
    };
  }

  if (params.minHeight || params.maxHeight) {
    newFilters.attributes = {
      ...newFilters.attributes,
      height: [`${params.minHeight || 0}-${params.maxHeight || 200}`],
    };
  }

  return newFilters;
}

export function getUrlParamsFromFilters(filters: FilterOptions): UrlParams {
  const params: UrlParams = {};

  if (filters.priceRange) {
    params.minPrice = filters.priceRange.min.toString();
    params.maxPrice = filters.priceRange.max.toString();
  }

  if (filters.attributes.height?.[0]) {
    const [minHeight, maxHeight] = filters.attributes.height[0].split('-');
    params.minHeight = minHeight;
    params.maxHeight = maxHeight;
  }

  return params;
}

export function getBreadcrumbs(
  selectedCategory: string,
  categories: NestedCategory[]
): {
  currentCategory: NestedCategory | null;
  parentCategory: NestedCategory | null;
} {
  const currentCategory =
    categories.find((cat) => cat.id === selectedCategory) || null;
  const parentId = currentCategory?.parent?.id;
  const parentCategory = parentId
    ? categories.find((cat) => cat.id === parentId) || null
    : null;

  return { currentCategory, parentCategory };
}

export function shouldShowSubCategories(
  selectedCategory: string,
  currentCategory: NestedCategory | null,
  parentCategory: NestedCategory | null
): boolean {
  if (selectedCategory === 'all' || !currentCategory) return false;
  if (!parentCategory) return true;
  return currentCategory.children?.length > 0;
}

export function getSubCategories(
  currentCategory: NestedCategory | null,
  parentCategory: NestedCategory | null
): NestedCategory[] {
  if (!currentCategory) return [];
  if (!parentCategory) return currentCategory.children || [];
  return currentCategory.children || [];
}
