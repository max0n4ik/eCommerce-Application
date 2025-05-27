import { useEffect } from 'react';

import useCatalogStore from '@/store/catalog';
import {
  formatPrice,
  getDiscountedPrice,
  getCategoryName,
} from '@/utils/catalog';
import type { ProductCardI } from '@/utils/interfaces';

export default function ProductCard({
  imageUrl,
  imageAlt,
  id,
  category,
  price,
  permyriad,
  name,
  description,
}: ProductCardI): React.JSX.Element {
  const { categories, fetchCategories } = useCatalogStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div key={id} className="border p-4 rounded shadow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="mb-2 rounded object-cover"
        />
      ) : (
        <div className="h-40 bg-gray-100 mb-2 rounded" />
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          {category && category.length > 0
            ? getCategoryName(category[0].id, categories)
            : 'Без категории'}
        </p>
        <h3 className="font-bold text-lg">{name}</h3>
        <h5 className="line-clamp-2">{description?.en}</h5>
        <div className="flex gap-2 justify-end">
          {permyriad && permyriad > 0 ? (
            <>
              <p className="font-bold text-lg line-through text-gray-500">
                {formatPrice(price)}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
              <p className="font-bold text-lg text-red-600">
                {formatPrice(getDiscountedPrice(price, permyriad))}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
            </>
          ) : (
            <p className="font-bold text-lg">
              {formatPrice(price)}{' '}
              <span className="font-normal text-lg">$</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
