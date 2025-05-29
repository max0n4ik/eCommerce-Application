import { useEffect } from 'react';

import { ProductCard } from '@/components/product-card';
import useCatalogStore from '@/store/catalog';
import type { ProductCardI } from '@/utils/interfaces';

export default function Catalog(): React.JSX.Element {
  const { products, loading, error, fetchProducts } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 bg-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((p: ProductCardI) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
