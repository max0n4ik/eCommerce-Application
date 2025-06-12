import type { ProductDiscount } from '@commercetools/platform-sdk';

import type { DiscountPrice } from '@/utils/interfaces';

export default function mappersDiscount(
  discount: ProductDiscount[]
): DiscountPrice[] {
  return discount.map((discount) => ({
    id: discount.id,
    name: discount.key ?? '',
    description: discount.description?.en ?? '',
    value: 'relative' === discount.value.type ? discount.value.permyriad : 0,
    category: discount.predicate,
  }));
}
