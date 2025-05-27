import { useEffect } from 'react';

import useCatalogStore from '@/store/catalog';
import {
  formatPrice,
  getDiscountedPrice,
  getCategoryName,
} from '@/utils/catalog';
import type { ProductCard } from '@/utils/interfaces';

export default function Catalog(p: ProductCard): React.JSX.Element {
  const { categories, fetchCategories } = useCatalogStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div key={p.id} className="border p-4 rounded shadow">
      {p.imageUrl ? (
        <img
          src={p.imageUrl}
          alt={p.imageAlt}
          className="mb-2 rounded object-cover"
        />
      ) : (
        <div className="h-40 bg-gray-100 mb-2 rounded" />
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          {p.category && p.category.length > 0
            ? getCategoryName(p.category[0].id, categories)
            : 'Без категории'}
        </p>
        <h3 className="font-bold text-lg">{p.name}</h3>
        <h5 className="line-clamp-2">{p.description?.en}</h5>
        <div className="flex gap-2 justify-end">
          {p.permyriad && p.permyriad > 0 ? (
            <>
              <p className="font-bold text-lg line-through text-gray-500">
                {formatPrice(p.price)}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
              <p className="font-bold text-lg text-red-600">
                {formatPrice(getDiscountedPrice(p.price, p.permyriad))}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
            </>
          ) : (
            <p className="font-bold text-lg">
              {formatPrice(p.price)}{' '}
              <span className="font-normal text-lg">$</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
