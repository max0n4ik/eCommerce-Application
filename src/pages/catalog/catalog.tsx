import { useEffect } from 'react';

import useCatalogStore from '@/store/catalog';
import type { ProductCard } from '@/utils/interfaces';

export default function CatalogPage(): React.JSX.Element {
  const { products, fetchProducts } = useCatalogStore();
  const { categories, fetchCategories } = useCatalogStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Категория не найдена';
  };

  return (
    <div>
      <div className="hero"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((p: ProductCard) => (
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
                  ? getCategoryName(p.category[0].id)
                  : 'Без категории'}
              </p>
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="font-bold text-lg self-end">
                {p.price}{' '}
                <span className="font-normal text-lg self-end">
                  {p.priceCurrency}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
