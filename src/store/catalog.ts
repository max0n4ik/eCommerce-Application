import { create } from 'zustand';

import mappersCatalog from '@/mappers/catalog';
import mappersCategory from '@/mappers/category';
import mappersDiscount from '@/mappers/discount';
import {
  fetchCatalogProducts,
  fetchCatalogCategories,
  fetchCatalogProductsDiscount,
  fetchProductById,
  fetchCatalogFilteredProducts,
} from '@/services/catalog';
import { getDiscount } from '@/utils/catalog';
import { nestCategories } from '@/utils/catalog';
import type {
  CategoryCard,
  DetailedProductInterface,
  DiscountPrice,
  ProductCardI,
  FilterI,
} from '@/utils/interfaces';

export type CatalogStore = {
  products: ProductCardI[];
  categories: CategoryCard[];
  discounts: DiscountPrice[];
  currentProduct: DetailedProductInterface | null;
  loading: boolean;
  productLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  filters: FilterI;
  total: number | null;
  fetchProducts: (offset: number, limit: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchDiscount: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  fetchFilteredProducts: (filters: FilterI) => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
  setFilters: (filter: Pick<FilterI, 'filter'>) => void;
};

const useCatalogStore = create<CatalogStore>((set, get) => ({
  products: [],
  categories: [],
  discounts: [],
  currentProduct: null,
  loading: false,
  productLoading: true,
  error: null,
  selectedCategory: null,
  total: null,
  filters: {
    filter: {
      price: { min: 0, max: 30000 },
      attributes: {},
      category: null,
      search: '',
      sort: { field: 'name', language: 'en', order: 'asc' },
    },
    filteredCatalog: [],
  },
  fetchProducts: async (offset, limit): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await fetchCatalogProducts(offset, limit);
      const fetchCatalogProductResult = response.results;
      const fetchCatalogProductTotal = response.total;
      const mappedProducts = mappersCatalog(fetchCatalogProductResult);
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

      set({
        discounts: mappedDiscount,
        products: productsWithDiscount,
        total: fetchCatalogProductTotal,
        loading: false,
      });
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
      set({ discounts: mappedDiscount, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        loading: false,
      });
    }
  },
  fetchFilteredProducts: async (filters: FilterI): Promise<void> => {
    try {
      const response = await fetchCatalogFilteredProducts(filters);
      set({
        filters: {
          filter: filters.filter,
          filteredCatalog: response.body.results,
        },
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  },

  fetchProduct: async (id: string): Promise<void> => {
    try {
      let { discounts } = get();
      set({ productLoading: true, error: null });
      if (discounts.length === 0) {
        const response = await fetchCatalogProductsDiscount();
        discounts = mappersDiscount(response);
      }
      const response = await fetchProductById(id);
      const current = response.body.masterData.current;
      const variant = current.masterVariant;
      const lang = 'en';
      const images =
        variant?.images?.map((img) => ({
          url: img.url,
          alt: img.label || 'Product image',
        })) || [];
      const categories = current.categories;
      const productPermyriad = getDiscount(discounts, categories);
      const product: DetailedProductInterface = {
        name: current.name[lang] || 'Unnamed Product',
        description: current.description && current.description[lang],
        images,
        permyriad: productPermyriad,
        price: variant?.prices?.[0]?.value?.centAmount || 0,
        priceCurrency: variant?.prices?.[0]?.value?.currencyCode || 'USD',
        category: categories || [],
        attributes: variant.attributes || [],
        id,
      };
      set({ currentProduct: product, productLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        productLoading: false,
      });
    }
  },
  setSelectedCategory: (category: string | null): void =>
    set({ selectedCategory: category }),
  setFilters: (filter: Pick<FilterI, 'filter'>): void =>
    set({ filters: filter }),
}));

export default useCatalogStore;
