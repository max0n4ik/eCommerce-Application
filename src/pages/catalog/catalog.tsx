import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import garden from '@/assets/images/plant_background.png';
import { CategoryToggle } from '@/components/category-toggle';
import { Filter } from '@/components/filter';
import { ProductCard } from '@/components/product-card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useUrlParams } from '@/hooks/use-url-params';
import useCatalogStore from '@/store/catalog';
import {
  findCategoryById,
  getSubCategories,
  shouldShowSubCategories,
} from '@/utils/catalog';
import { FILTER_CONSTANTS } from '@/utils/constantes';
import type { FilterI } from '@/utils/interfaces';
import type { NestedCategory } from '@/utils/types';

export default function Catalog(): React.JSX.Element {
  const {
    products,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    categories,
    selectedCategory,
    setSelectedCategory,
    filters,
    fetchFilteredProducts,
    setFilters,
  } = useCatalogStore();

  const { initFromUrl, updateParams } = useUrlParams();
  const [temporaryFilters, setTemporaryFilters] = useState<FilterI>(filters);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const filters = initFromUrl();
    setTemporaryFilters(filters);
    fetchFilteredProducts(filters);
  }, [initFromUrl, fetchFilteredProducts]);

  const handleCategoryChange = (value: string): void => {
    const categoryId = value === 'all' ? null : value;
    const updatedFilters = {
      ...filters,
      filter: {
        ...filters.filter,
        category: categoryId,
      },
    };

    setSelectedCategory(categoryId);
    setFilters(updatedFilters);
    setTemporaryFilters(updatedFilters);
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const handleBackCategory = (): void => {
    if (parentCategory) {
      handleCategoryChange(parentCategory.id);
    } else {
      handleCategoryChange('all');
    }
  };

  const handleFiltersChange = (newFilters: FilterI): void => {
    setTemporaryFilters(newFilters);
  };

  const handleSheetClose = (): void => {
    setFilters(temporaryFilters);
    updateParams(temporaryFilters);
    fetchFilteredProducts(temporaryFilters);
  };

  const { category: currentCategory, parent: parentCategory } = useMemo(
    () =>
      findCategoryById(selectedCategory || '', categories as NestedCategory[]),
    [selectedCategory, categories]
  );

  const showSubCategories = useMemo(
    () =>
      shouldShowSubCategories(
        selectedCategory || '',
        currentCategory,
        parentCategory
      ),
    [selectedCategory, currentCategory, parentCategory]
  );
  const subCategories = useMemo(
    () => getSubCategories(currentCategory, parentCategory),
    [currentCategory, parentCategory]
  );

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
      <div className="relative h-[350px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={garden}
            alt="Catalog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <h1 className="text-4xl font-bold text-white z-10 mb-4">Catalog</h1>

        <div className="flex items-center text-white z-10 gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className="hover:underline"
          >
            Catalog
          </button>
          {parentCategory && (
            <>
              <span>&gt;</span>
              <button
                onClick={() => handleCategoryChange(parentCategory.id)}
                className="hover:underline"
              >
                {parentCategory.name}
              </button>
            </>
          )}
          {currentCategory && selectedCategory && (
            <>
              <span>&gt;</span>
              <button
                onClick={() => handleCategoryChange(currentCategory.id)}
                className="hover:underline"
              >
                {currentCategory.name}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Sheet onOpenChange={(open) => !open && handleSheetClose()}>
            <SheetTrigger className="h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              <SlidersHorizontal />
              Filter
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                  Select parameters for filtering products
                </SheetDescription>
              </SheetHeader>
              <Filter
                filters={temporaryFilters}
                onFiltersChange={handleFiltersChange}
              />
            </SheetContent>
          </Sheet>

          {(temporaryFilters.filter.price ||
            Object.keys(temporaryFilters.filter.attributes || {}).length >
              0) && (
            <div className="flex flex-wrap gap-2">
              {temporaryFilters.filter.price && (
                <div className="bg-primary/20 px-3 py-1 rounded-full text-sm">
                  Price:{' '}
                  {temporaryFilters.filter.price.min /
                    FILTER_CONSTANTS.PRICE.DIVIDE}{' '}
                  -{' '}
                  {temporaryFilters.filter.price.max /
                    FILTER_CONSTANTS.PRICE.DIVIDE}
                </div>
              )}
              {Object.entries(temporaryFilters.filter.attributes || {}).map(
                ([key, values]) => (
                  <div
                    key={key}
                    className="bg-primary/20 px-3 py-1 rounded-full text-sm"
                  >
                    {key}: {values.join(', ')}
                  </div>
                )
              )}
            </div>
          )}

          <div className="relative flex justify-center">
            {showSubCategories ? (
              <CategoryToggle
                categories={subCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onBack={handleBackCategory}
                showBackButton
              />
            ) : (
              <CategoryToggle
                categories={categories as NestedCategory[]}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                showBackButton={false}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filters.filteredCatalog?.map((filteredProduct) => {
          const product = products.find((p) => p.id === filteredProduct.id);
          return product ? <ProductCard key={product.id} {...product} /> : null;
        })}
      </div>
    </div>
  );
}
