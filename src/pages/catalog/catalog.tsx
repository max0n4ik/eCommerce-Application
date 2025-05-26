import useCatalogStore from '@/store/catalog';
import type { ProductCard } from '@/utils/interfaces';

export default function CatalogPage(): React.JSX.Element {
  //надо взять из стора все продукты
  const { products, fetchProducts } = useCatalogStore();
  fetchProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((p: ProductCard) => (
        <div key={p.id} className="border p-4 rounded shadow">
          {p.imageUrl ? (
            <img src={p.imageUrl} alt={p.imageAlt} className="mb-2 rounded" />
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
