import { useState } from 'react';

import type { ProductCardI } from '@/utils/interfaces';

interface FilterProps {
  products: ProductCardI[];
  onFilterChange: (filteredProducts: ProductCardI[]) => void;
}

export default function Filter({
  products,
  onFilterChange,
}: FilterProps): React.JSX.Element {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [heightRange, setHeightRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });

  const handlePriceChange = (type: 'min' | 'max', value: number): void => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
    filterProducts();
  };

  const handleHeightChange = (type: 'min' | 'max', value: number): void => {
    setHeightRange((prev) => ({ ...prev, [type]: value }));
    filterProducts();
  };

  const filterProducts = (): void => {
    const filtered = products.filter((product) => {
      const price = product.salePrice || product.price;
      const height =
        product.attributes?.find((attr) => attr.name === 'height')?.value[0] ||
        0;

      return (
        price >= priceRange.min &&
        price <= priceRange.max &&
        height >= heightRange.min &&
        height <= heightRange.max
      );
    });

    onFilterChange(filtered);
  };

  return (
    <div className="">
      <div className="mb-4">
        <h4 className="font-medium mb-2">Price</h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', Number(e.target.value))}
            className="w-24 p-2 border rounded"
            placeholder="Мин"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
            className="w-24 p-2 border rounded"
            placeholder="Макс"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Hight</h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={heightRange.min}
            onChange={(e) => handleHeightChange('min', Number(e.target.value))}
            className="w-24 p-2 border rounded"
            placeholder="Мин"
          />
          <input
            type="number"
            value={heightRange.max}
            onChange={(e) => handleHeightChange('max', Number(e.target.value))}
            className="w-24 p-2 border rounded"
            placeholder="Макс"
          />
        </div>
      </div>
    </div>
  );
}
