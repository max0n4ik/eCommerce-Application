import { SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';

import garden from '@/assets/images/plant_background.png';
import { Filter } from '@/components/filter';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useCatalogStore from '@/store/catalog';
import {
  findCategoryById,
  getSubCategories,
  shouldShowSubCategories,
} from '@/utils/catalog';
import type { ProductCardI } from '@/utils/interfaces';
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
  } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category?.some((cat) => cat.id === selectedCategory);
  });

  const { category: currentCategory, parent: parentCategory } =
    findCategoryById(selectedCategory, categories as NestedCategory[]);

  const showSubCategories = shouldShowSubCategories(
    selectedCategory,
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
            onClick={() => setSelectedCategory('all')}
            className="hover:underline"
          >
            Catalog
          </button>
          {parentCategory && (
            <>
              <span>&gt;</span>
              <button
                onClick={() => setSelectedCategory(parentCategory.id)}
                className="hover:underline"
              >
                {parentCategory.name}
              </button>
            </>
          )}
          {currentCategory && selectedCategory !== 'all' && (
            <>
              <span>&gt;</span>
              <button
                onClick={() => setSelectedCategory(currentCategory.id)}
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'}>
                <SlidersHorizontal />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50">
              <Filter
                products={products}
                onFilterChange={() => {
                  console.log('filter changed');
                }}
              ></Filter>
            </PopoverContent>
          </Popover>

          <ToggleGroup
            type="single"
            className="bg-primary rounded-xl p-1"
            value={selectedCategory}
            onValueChange={(value) => value && setSelectedCategory(value)}
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
              value={selectedCategory}
              onValueChange={(value) => value && setSelectedCategory(value)}
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
        {filteredProducts.map((p: ProductCardI) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
