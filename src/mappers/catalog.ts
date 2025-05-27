import type { ClientResponse, Product } from '@commercetools/platform-sdk';

import type { ProductCard } from '@/utils/interfaces';

export default function mappersCatalog(
  products: ClientResponse<Product[]>
): ProductCard[] {
  return products.body.map((product) => ({
    id: product.id,
    name: product.masterData.staged.name.en,
    price:
      product.masterData.staged.masterVariant.prices?.[0]?.value.centAmount ??
      0,
    priceCurrency:
      product.masterData.staged.masterVariant.prices?.[0]?.value.currencyCode ??
      '',
    imageUrl: product.masterData.staged.masterVariant.images?.[0]?.url ?? '',
    description: product.masterData.staged.description,
    category: product.masterData.staged.categories,
    attributes: product.masterData.staged.masterVariant.attributes,
  }));
}
