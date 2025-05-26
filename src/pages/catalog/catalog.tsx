import { useEffect, useState } from 'react';

import { fetchCatalogProducts } from '@/services/catalog';
import type { ProductCard } from '@/utils/types';

export default function CatalogPage(): React.JSX.Element {
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const raw = await fetchCatalogProducts();
      const parsed = raw.map((p) => ({
        id: p.id,
        name: p.name?.en ?? '',
        description: p.description?.en ?? '',
        image: p.masterVariant.images?.[0]?.url ?? null,
      }));
      setProducts(parsed);
    };
    load();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          {p.image ? (
            <img src={p.image} alt={p.name} className="mb-2 rounded" />
          ) : (
            <div className="h-40 bg-gray-100 mb-2 rounded" />
          )}
          <h3 className="font-bold text-lg">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
