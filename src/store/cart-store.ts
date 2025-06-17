import type { LineItem } from '@commercetools/platform-sdk';
import { create } from 'zustand';

import { getCartProducts } from '../mappers/cart';
import {
  addItemToCart,
  deleteCart,
  getActiveCart,
  setLineItemQuantity,
} from '../services/cart-service';
import type { DiscountCodeType, ProductType } from '../utils/types';

interface CartState {
  productsInCart: ProductType[];
  productsInCartSku: Set<string>;
  discountPromo: DiscountCodeType;
  totalAmount: number;
  totalPrice: number;
  error: null | string;
  success: null | string;

  getCart: () => Promise<void>;
  addToCart: (
    sku: string,
    quantity?: number,
    productId?: string,
    variantId?: number
  ) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  removeProductFromCart: (sku: string) => void;
  changeQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  isProductInCart: (sku: string) => boolean;
  getLineItemIdBySku: (sku: string) => string;
  addProductToCartSku: (sku: string) => void;
  removeProductToCartSku: (sku: string) => void;
  clearCart: () => Promise<void>;
  resetCart: () => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  productsInCart: [],
  productsInCartSku: new Set<string>(),
  discountPromo: {} as DiscountCodeType,
  totalAmount: 0,
  totalPrice: 0,
  error: null,
  success: null,

  addToCart: async (
    sku: string,
    quantity?: number,
    productId?: string
  ): Promise<void> => {
    try {
      const response = await addItemToCart(quantity, sku, productId);

      if (response.statusCode === 200) {
        const lineItems: LineItem[] = [...response.body.lineItems];
        const products = getCartProducts(lineItems);

        set((state) => ({
          productsInCart: [...products],
          productsInCartSku: new Set([...state.productsInCartSku, sku]),
          totalAmount: response.body.totalLineItemQuantity ?? 0,
          totalPrice: response.body.totalPrice.centAmount,
          success: 'Product added to cart successfully',
          error: null,
        }));
      }

      if (response.statusCode === 400) {
        throw new Error('Unexpected error');
      }
    } catch {
      set({ error: 'Error adding product to cart' });
    }
  },

  getCart: async (): Promise<void> => {
    const hasCartId = localStorage.getItem('cartId');

    if (hasCartId) {
      try {
        const response = await getActiveCart();

        if (response.statusCode === 200) {
          const lineItems: LineItem[] = [...response.body.lineItems];
          const skuSet = new Set<string>();

          lineItems.forEach((item) => {
            skuSet.add(item.variant.sku as string);
          });

          const products = getCartProducts(lineItems);

          set({
            productsInCart: [...products],
            productsInCartSku: skuSet,
            totalAmount: response.body.totalLineItemQuantity ?? 0,
            totalPrice: response.body.totalPrice.centAmount,
            error: null,
          });
        }

        if (response.statusCode === 400) {
          throw new Error('Unexpected error');
        }
      } catch {
        set({ error: 'Error loading cart' });
      }
    }
  },

  isProductInCart: (sku: string): boolean => {
    return get().productsInCartSku.has(sku);
  },

  addProductToCartSku: (sku: string): void => {
    set((state) => ({
      productsInCartSku: new Set([...state.productsInCartSku, sku]),
    }));
  },

  removeProductToCartSku: (sku: string): void => {
    set((state) => {
      const newSet = new Set(state.productsInCartSku);
      newSet.delete(sku);
      return { productsInCartSku: newSet };
    });
  },

  getLineItemIdBySku: (sku: string): string => {
    const { productsInCart } = get();

    return (
      productsInCart.find((item) => item.variants[0].sku === sku)?.lineItemId ??
      ''
    );
  },

  removeProductFromCart: (sku: string): void => {
    const { getLineItemIdBySku, removeFromCart, removeProductToCartSku } =
      get();

    const lineItemId = getLineItemIdBySku(sku);

    if (lineItemId) {
      removeFromCart(lineItemId);
      removeProductToCartSku(sku);
    }
  },

  removeFromCart: async (lineItemId: string): Promise<void> => {
    try {
      const response = await setLineItemQuantity(lineItemId, 0);

      if (response.statusCode === 200) {
        set((state) => {
          const updatedProduct = state.productsInCart.find(
            (item) => item.lineItemId === lineItemId
          );

          const newSkuSet = new Set(state.productsInCartSku);
          newSkuSet.delete(updatedProduct?.variants[0].sku as string);

          return {
            productsInCart: state.productsInCart.filter(
              (item) => item.lineItemId !== lineItemId
            ),
            productsInCartSku: newSkuSet,
            totalAmount: response.body.totalLineItemQuantity ?? 0,
            totalPrice: response.body.totalPrice.centAmount,
            success: 'Product removed from cart successfully',
            error: null,
          };
        });
      }

      if (response.statusCode === 400) {
        throw new Error('Unexpected error');
      }
    } catch {
      set({ error: 'Error remove product from cart' });
    }
  },

  changeQuantity: async (
    lineItemId: string,
    quantity: number
  ): Promise<void> => {
    try {
      const response = await setLineItemQuantity(lineItemId, quantity);

      if (response.statusCode === 200) {
        const updatedProduct = response.body.lineItems.find(
          (item) => item.id === lineItemId
        );

        set((state) => ({
          productsInCart: state.productsInCart.map((item) => {
            if (item.lineItemId === lineItemId) {
              return {
                ...item,
                quantity: updatedProduct?.quantity,
                totalPrice: updatedProduct?.totalPrice.centAmount,
              };
            }
            return item;
          }),
          totalAmount: response.body.totalLineItemQuantity ?? 0,
          totalPrice: response.body.totalPrice.centAmount,
          error: null,
        }));
      }

      if (response.statusCode === 400) {
        throw new Error('Unexpected error');
      }
    } catch {
      set({ error: 'Error get cart' });
    }
  },

  clearCart: async (): Promise<void> => {
    try {
      const response = await deleteCart();

      if (response.statusCode === 200) {
        set({
          discountPromo: {} as DiscountCodeType,
          productsInCart: [],
          productsInCartSku: new Set<string>(),
          totalAmount: 0,
          totalPrice: 0,
          success: 'All products removed from cart successfully',
          error: null,
        });
      }
    } catch {
      set({ error: 'Error delete all products from cart' });
    }
  },

  resetCart: (): void => {
    set({
      discountPromo: {} as DiscountCodeType,
      productsInCart: [],
      productsInCartSku: new Set<string>(),
      totalAmount: 0,
      totalPrice: 0,
    });
  },

  clearError: (): void => {
    set({ error: null });
  },

  clearSuccess: (): void => {
    set({ success: null });
  },
}));

export const cartStore = {
  getState: useCartStore.getState,
  setState: useCartStore.setState,
  subscribe: useCartStore.subscribe,
};
