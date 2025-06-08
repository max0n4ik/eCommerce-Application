import type {
  ClientResponse,
  ProductDiscount,
} from '@commercetools/platform-sdk';

import type { DiscountPrice } from '@/utils/interfaces';

export default function mappersDiscount(
  discount: ClientResponse<ProductDiscount[]>
): DiscountPrice[] {
  return discount.body.map((discount) => ({
    id: discount.id,
    name: discount.key ?? '',
    description: discount.description?.en ?? '',
    value: 'relative' === discount.value.type ? discount.value.permyriad : 0,
    category: discount.predicate,
  }));
}
