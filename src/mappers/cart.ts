import type { LineItem } from '@commercetools/platform-sdk';

import type { ProductType } from '@/utils/types';

export const getCartProducts = (lineItems: LineItem[]): ProductType[] => {
  const products: ProductType[] = lineItems.reduce((acc, item) => {
    const obj = {} as ProductType;
    obj.variants = [];
    obj.lineItemId = `${item.id}`;
    obj.productId = `${item.productId}`;
    obj.productKey = `${item.variant.key}`;
    obj.productName = `${item.name?.en}`;
    obj.variants.push(item.variant);
    obj.quantity = item.quantity;

    if (item.price) {
      obj.price = item.price?.value?.centAmount;
      obj.currency = item.price?.value.currencyCode;
      obj.isDiscount = Boolean(item.price?.discounted);
      obj.totalPrice = item.totalPrice.centAmount;

      if (obj.isDiscount)
        obj.priceDiscount = item.price?.discounted?.value.centAmount;
    }

    if (item.discountedPricePerQuantity.length > 0) {
      obj.promoPrice =
        item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
      obj.isPromo = true;
    }

    acc.push(obj);

    return acc;
  }, [] as ProductType[]);
  return products;
};
