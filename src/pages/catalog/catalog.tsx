import { useEffect } from 'react';

import { Catalog } from '@/components/catalog';
import useCatalogStore from '@/store/catalog';
import type { ProductCard } from '@/utils/interfaces';

export default function CatalogPage(): React.JSX.Element {
  const { products, fetchProducts } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="hero"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((p: ProductCard) => (
          <Catalog key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
