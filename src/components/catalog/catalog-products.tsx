import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

import { ProductCard } from '@/components/product-card';
import { handleScrollToTop } from '@/utils/catalog-scroll-to-top';
import type { ProductCardI } from '@/utils/interfaces';

interface CatalogProductsProps {
  products: ProductCardI[];
  topRef: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export function CatalogProducts({
  products,
  topRef,
  currentPage,
  setCurrentPage,
  totalPages,
}: CatalogProductsProps): React.JSX.Element {
  const [showUpButton, setShowUpButton] = useState(false);
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage, topRef]);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowUpButton(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-md transition-opacity ${
          showUpButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-arrow-up-icon lucide-circle-arrow-up"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m16 12-4-4-4 4" />
          <path d="M12 16V8" />
        </svg>
      </button>
    </div>
  );
}
