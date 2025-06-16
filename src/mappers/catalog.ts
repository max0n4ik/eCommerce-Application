import type { Product } from '@commercetools/platform-sdk';

import type { ProductCardI } from '@/utils/interfaces';

export default function mappersCatalog(products: Product[]): ProductCardI[] {
  return products.map((product) => ({
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
    masterVariant: product.masterData.staged.masterVariant,
  }));
}
