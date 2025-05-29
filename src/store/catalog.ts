import { create } from 'zustand';

import mappersCatalog from '@/mappers/catalog';
import mappersCategory from '@/mappers/category';
import mappersDiscount from '@/mappers/discount';
import {
  fetchCatalogProducts,
  fetchCatalogCategories,
  fetchCatalogProductsDiscount,
  fetchProductById,
} from '@/services/catalog';
import { nestCategories } from '@/utils/catalog';
import type {
  CategoryCard,
  DiscountPrice,
  ProductCardI,
} from '@/utils/interfaces';

type CatalogStore = {
  products: ProductCardI[];
  categories: CategoryCard[];
  discount: DiscountPrice[];
  currentProduct: ProductCardI | null;
  loading: boolean;
  productLoading: boolean;
  error: string | null;
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchDiscount: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  setSelectedCategory: (category: string) => void;
};

const useCatalogStore = create<CatalogStore>((set) => ({
  products: [],
  categories: [],
  discount: [],
  currentProduct: null,
  loading: false,
  productLoading: false,
  error: null,
  selectedCategory: 'all',
  fetchProducts: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await fetchCatalogProducts();
      const mappedProducts = mappersCatalog(response);
      const discountResponse = await fetchCatalogProductsDiscount();
      const mappedDiscount = mappersDiscount(discountResponse);

      const productsWithDiscount = mappedProducts.map((product) => {
        const productDiscount = mappedDiscount.find((discount) => {
          const discountCategories = new Set(
            discount.category
              ?.match(/"([^"]+)"/g)
              ?.map((id) => id.replaceAll('"', '').trim())
          );

          return product.category?.some((cat) =>
            discountCategories.has(cat.id)
          );
        });

        return {
          ...product,
          permyriad: productDiscount ? productDiscount.value : 0,
        };
      });

      set({ products: productsWithDiscount, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        loading: false,
      });
    }
  },
  fetchCategories: async (): Promise<void> => {
    const response = await fetchCatalogCategories();
    const mappedCategory = mappersCategory(response);
    const nestCategory = nestCategories(mappedCategory);
    set({ categories: nestCategory });
  },
  fetchDiscount: async (): Promise<void> => {
    try {
      set({ loading: true, error: null });
      const response = await fetchCatalogProductsDiscount();
      const mappedDiscount = mappersDiscount(response);
      set({ discount: mappedDiscount, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        loading: false,
      });
    }
  },

  fetchProduct: async (id: string): Promise<void> => {
    try {
      set({ productLoading: true, error: null });
      const response = await fetchProductById(id);
      console.log(response);
      set({ productLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        productLoading: false,
      });
    }
  },
  setSelectedCategory: (category: string): void =>
    set({ selectedCategory: category }),
}));

export default useCatalogStore;
