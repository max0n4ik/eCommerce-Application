import type { FilterI } from './interfaces';
import type { NestedCategory } from './types';

interface UrlParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minHeight?: string;
  maxHeight?: string;
}

export function initializeFiltersFromUrl(
  params: UrlParams,
  currentFilter: FilterI
): FilterI {
  const newFilters = { ...currentFilter };

  if (params.minPrice || params.maxPrice) {
    newFilters.filter.price = {
      min: Number(params.minPrice) || 0,
      max: Number(params.maxPrice) || 30000,
    };
  }

  if (params.category) {
    newFilters.filter.category = params.category;
  }

  return newFilters;
}

export function getUrlParamsFromFilters(filters: FilterI): UrlParams {
  const params: UrlParams = {};

  if (filters.filter.price) {
    params.minPrice = filters.filter.price.min.toString();
    params.maxPrice = filters.filter.price.max.toString();
  }

  if (filters.filter.category) {
    params.category = filters.filter.category;
  }

  if (filters.filter.attributes?.height?.[0]) {
    const [minHeight, maxHeight] =
      filters.filter.attributes.height[0].split('-');
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
