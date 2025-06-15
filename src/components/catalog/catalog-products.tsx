import { useEffect, useMemo, useState } from 'react';

import { Button } from '../ui/button';

import { ProductCard } from '@/components/product-card';
import { ITEMS_PER_PAGE } from '@/utils/constantes';
import type { ProductCardI } from '@/utils/interfaces';

interface CatalogProductsProps {
  products: ProductCardI[];
  filteredProductIds: { id: string }[];
}

export function CatalogProducts({
  products,
  filteredProductIds,
}: CatalogProductsProps): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = useMemo(
    () =>
      filteredProductIds
        .map((filtered) => products.find((p) => p.id === filtered.id))
        .filter((p): p is ProductCardI => !!p),
    [filteredProductIds, products]
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    const productContainer = document.querySelector(
      '#catalog-controls-container'
    );
    if (productContainer) {
      productContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);
  return (
    <div id="product-container" className="flex flex-col gap-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Back
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
