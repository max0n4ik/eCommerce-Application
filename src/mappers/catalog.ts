import type { ClientResponse, Product } from '@commercetools/platform-sdk';

import type { ProductCard } from '@/utils/interfaces';

export default function mappers(
  products: ClientResponse<Product[]>
): ProductCard[] {
  return products.body.map((product) => ({
    id: product.id,
    name: product.masterData.staged.name.en,
    price:
      product.masterData.staged.masterVariant.prices?.[0]?.value.centAmount ??
      0,
    imageUrl: product.masterData.staged.masterVariant.images?.[0]?.url ?? '',
  }));
}
