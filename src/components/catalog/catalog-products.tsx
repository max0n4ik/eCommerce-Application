import { ProductCard } from '@/components/product-card';
import type { ProductCardI } from '@/utils/interfaces';

interface CatalogProductsProps {
  products: ProductCardI[];
  filteredProductIds: { id: string }[];
}

export function CatalogProducts({
  products,
  filteredProductIds,
}: CatalogProductsProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredProductIds?.map((filteredProduct) => {
        const product = products.find((p) => p.id === filteredProduct.id);
        return product ? <ProductCard key={product.id} {...product} /> : null;
      })}
    </div>
  );
}
