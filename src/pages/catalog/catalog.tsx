import { SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';

import garden from '@/assets/images/plant_background.png';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useUrlParams } from '@/hooks/use-url-params';
import useCatalogStore from '@/store/catalog';
import {
  findCategoryById,
  getSubCategories,
  shouldShowSubCategories,
} from '@/utils/catalog';
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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const filters = initFromUrl();
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
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const handleSheetClose = (): void => {
    const updatedFilters = {
      ...filters,
      filter: {
        ...filters.filter,
        category: selectedCategory,
      },
    };

    setFilters(updatedFilters);
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const { category: currentCategory, parent: parentCategory } =
    findCategoryById(selectedCategory || '', categories as NestedCategory[]);
  const showSubCategories = shouldShowSubCategories(
    selectedCategory || '',
    currentCategory,
    parentCategory
  );
  const subCategories = getSubCategories(currentCategory, parentCategory);

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
              <Filter />
            </SheetContent>
          </Sheet>

          {/* {(filters.filter.price ||
            Object.keys(filters.filter.attributes).length > 0) && (
            <div className="flex flex-wrap gap-2">
              {filters.filter.price && (
                <div className="bg-primary/20 px-3 py-1 rounded-full text-sm">
                  Price: {filters.filter.price.min} - {filters.filter.price.max}
                </div>
              )}
              {Object.entries(filters.filter.attributes).map(
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
          )} */}

          <ToggleGroup
            type="single"
            className="bg-primary rounded-xl p-1"
            value={selectedCategory || 'all'}
            onValueChange={(value) => value && handleCategoryChange(value)}
          >
            <ToggleGroupItem
              value="all"
              className="text-white data-[state=on]:bg-white/20 px-5 rounded-xl"
            >
              All
            </ToggleGroupItem>
            {categories.map((category) => (
              <ToggleGroupItem
                key={category.id}
                value={category.id}
                className="text-white data-[state=on]:bg-white/20 uppercase px-5 rounded-xl"
              >
                {category.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {showSubCategories && (
          <div className="flex flex-wrap gap-2 justify-center">
            <ToggleGroup
              type="single"
              className="bg-primary rounded-xl p-1"
              value={selectedCategory || 'all'}
              onValueChange={(value) => value && handleCategoryChange(value)}
            >
              {subCategories.map((category) => (
                <ToggleGroupItem
                  key={category.id}
                  value={category.id}
                  className="text-white data-[state=on]:bg-white/20 uppercase px-5 rounded-xl"
                >
                  {category.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
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
