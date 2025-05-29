import { useEffect } from 'react';

import garden from '@/assets/images/plant_background.png';
import { ProductCard } from '@/components/product-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useCatalogStore from '@/store/catalog';
import type { ProductCardI } from '@/utils/interfaces';

export default function Catalog(): React.JSX.Element {
  const {
    products,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    categories,
  } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      <div className=" relative h-[350px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={garden}
            alt="Catalog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <h1 className="text-4xl font-bold text-white z-10 mb-4">Catalog</h1>

        <div className="flex items-center text-white z-10">хлебные крошки</div>
      </div>
      <div className="flex flex-wrap gap-2 p-4 justify-center ">
        <ToggleGroup type="single" className="bg-primary rounded-xl p-1">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((p: ProductCardI) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
