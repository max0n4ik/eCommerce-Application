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
import { getDiscount } from '@/utils/catalog';
import type {
  CategoryCard,
  DetailedProductInterface,
  DiscountPrice,
  ProductCardI,
} from '@/utils/interfaces';

type CatalogStore = {
  products: ProductCardI[];
  categories: CategoryCard[];
  discounts: DiscountPrice[];
  currentProduct: DetailedProductInterface | null;
  loading: boolean;
  productLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchDiscount: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
};

const useCatalogStore = create<CatalogStore>((set, get) => ({
  products: [],
  categories: [],
  discounts: [],
  currentProduct: null,
  loading: false,
  productLoading: true,
  error: null,
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

      set({
        discounts: mappedDiscount,
        products: productsWithDiscount,
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
    try {
      set({ loading: true, error: null });
      const response = await fetchCatalogCategories();
      const mappedCategory = mappersCategory(response);
      set({ categories: mappedCategory, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        loading: false,
      });
    }
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
        id: response.body.id,
        name: current.name[lang] || 'Unnamed Product',
        description: current.description[lang],
        images,
        permyriad: productPermyriad,
        price: variant?.prices?.[0]?.value?.centAmount || 0,
        priceCurrency: variant?.prices?.[0]?.value?.currencyCode || 'USD',
        category: categories || [],
        attributes: variant.attributes || [],
      };
      set({ currentProduct: product, productLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        productLoading: false,
      });
    }
  },
}));

export default useCatalogStore;
