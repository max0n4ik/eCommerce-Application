import type { Category } from '@commercetools/platform-sdk';

import type { CategoryCard } from '@/utils/interfaces';

export default function mappersCategory(category: Category[]): CategoryCard[] {
  return category.map((category) => ({
    id: category.id,
    name: category.name.en,
    description: category.description?.en ?? '',
    parent: category.parent,
  }));
}
