import { create } from 'zustand';

import mappersCatalog from '@/mappers/catalog';
import mappersCategory from '@/mappers/category';
import mappersDiscount from '@/mappers/discount';
import {
  fetchCatalogProducts,
  fetchCatalogCategories,
  fetchCatalogProductsDiscount,
} from '@/services/catalog';
import type {
  CategoryCard,
  DiscountPrice,
  ProductCard,
} from '@/utils/interfaces';

type CatalogStore = {
  products: ProductCard[];
  categories: CategoryCard[];
  discount: DiscountPrice[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchDiscount: () => Promise<void>;
};

const useCatalogStore = create<CatalogStore>((set) => ({
  products: [],
  categories: [],
  discount: [],
  fetchProducts: async (): Promise<void> => {
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

        return product.category?.some((cat) => discountCategories.has(cat.id));
      });

      return {
        ...product,
        permyriad: productDiscount ? productDiscount.value : 0,
      };
    });

    set({ products: productsWithDiscount });
  },
  fetchCategories: async (): Promise<void> => {
    const response = await fetchCatalogCategories();
    const mappedCategory = mappersCategory(response);
    set({ categories: mappedCategory });
  },
  fetchDiscount: async (): Promise<void> => {
    const response = await fetchCatalogProductsDiscount();
    const mappedDiscount = mappersDiscount(response);
    set({ discount: mappedDiscount });
  },
}));

export default useCatalogStore;
