import { useEffect } from 'react';

import useCatalogStore from '@/store/catalog';
import type { ProductCard } from '@/utils/interfaces';

const formatPrice = (price: number): string => {
  return price.toString().replace(/(\d{2})$/, '.$1');
};
const getDiscountedPrice = (price: number, permyriad: number = 0): number => {
  return (price * (10000 - permyriad)) / 10000;
};
export default function CatalogPage(): React.JSX.Element {
  const { products, fetchProducts } = useCatalogStore();
  const { categories, fetchCategories } = useCatalogStore();
  const { discount, fetchDiscount } = useCatalogStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  useEffect(() => {
    fetchDiscount();
  }, [fetchDiscount]);
  const getDiscounts = (): ProductCard[] => {
    return products.map((product) => {
      const productDiscount = discount.find((discount) => {
        const discountCategories = new Set(
          discount.category
            .replace('categoriesWithAncestors.id = (', '')
            .replace(')', '')
            .split(',')
            .map((id) => id.replaceAll('"', '').trim())
        );

        return product.category?.some((cat) => discountCategories.has(cat.id));
      });

      return {
        ...product,
        permyriad: productDiscount ? productDiscount.value : 0,
        price: productDiscount
          ? (product.price * (10000 - productDiscount.value)) / 10000
          : product.price,
      };
    });
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Категория не найдена';
  };

  return (
    <div>
      <div className="hero"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {getDiscounts().map((p: ProductCard) => (
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
        ))}
      </div>
    </div>
  );
}
