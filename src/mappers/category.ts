import type { Category, ClientResponse } from '@commercetools/platform-sdk';

import type { CategoryCard } from '@/utils/interfaces';

export default function mappersCategory(
  category: ClientResponse<Category[]>
): CategoryCard[] {
  return category.body.map((category) => ({
    id: category.id,
    name: category.name.en,
    description: category.description?.en ?? '',
    parent: category.parent,
  }));
}
