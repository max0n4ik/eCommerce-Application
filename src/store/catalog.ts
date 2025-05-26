import { create } from 'zustand';

import { mappers } from '@/mappers';
import {
  fetchCatalogProducts,
  fetchCatalogCategories,
} from '@/services/catalog';

const useCatalogStore = create((set) => ({
  products: [],
  categories: [],
  fetchProducts: async (): Promise<void> => {
    const response = await fetchCatalogProducts();
    const mappedProducts = mappers(response);
    set({ products: mappedProducts });
  },
  fetchCategories: async (): Promise<void> => {
    const response = await fetchCatalogCategories();
    set({ categories: response.body.results });
  },
}));

export default useCatalogStore;
