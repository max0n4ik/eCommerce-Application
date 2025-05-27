import { useEffect } from 'react';

import { ProductCard } from '@/components/product-card';
import useCatalogStore from '@/store/catalog';
import type { ProductCardI } from '@/utils/interfaces';

export default function Catalog(): React.JSX.Element {
  const { products, fetchProducts } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="hero"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((p: ProductCardI) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
