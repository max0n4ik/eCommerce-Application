import { create } from 'zustand';

import mappersCatalog from '@/mappers/catalog';
import mappersCategory from '@/mappers/category';
import {
  fetchCatalogProducts,
  fetchCatalogCategories,
} from '@/services/catalog';
import type { CategoryCard, ProductCard } from '@/utils/interfaces';

type CatalogStore = {
  products: ProductCard[];
  categories: CategoryCard[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
};

const useCatalogStore = create<CatalogStore>((set) => ({
  products: [],
  categories: [],
  fetchProducts: async (): Promise<void> => {
    const response = await fetchCatalogProducts();
    const mappedProducts = mappersCatalog(response);
    console.log(response);
    set({ products: mappedProducts });
  },
  fetchCategories: async (): Promise<void> => {
    const response = await fetchCatalogCategories();
    const mappedCategory = mappersCategory(response);
    set({ categories: mappedCategory });
  },
}));

export default useCatalogStore;
