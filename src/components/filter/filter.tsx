import { useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { useUrlParams } from '@/hooks/use-url-params';

interface FilterProps {
  onFilterChange: (filters: {
    priceRange: { min: number; max: number } | null;
    attributes: Record<string, string[]>;
  }) => void;
}

export default function Filter({
  onFilterChange,
}: FilterProps): React.ReactElement {
  const { updateParams, getParams } = useUrlParams();
  const params = getParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(params.minPrice) || 0,
    Number(params.maxPrice) || 300,
  ]);

  const [heightRange, setHeightRange] = useState<[number, number]>([
    Number(params.minHeight) || 0,
    Number(params.maxHeight) || 200,
  ]);

  const handlePriceChange = (value: number[]): void => {
    const newRange = value as [number, number];
    setPriceRange(newRange);
    updateParams({
      minPrice: newRange[0].toString(),
      maxPrice: newRange[1].toString(),
    });
    onFilterChange({
      priceRange: {
        min: newRange[0],
        max: newRange[1],
      },
      attributes: {
        height: [`${heightRange[0]}-${heightRange[1]}`],
      },
    });
  };

  const handleHeightChange = (value: number[]): void => {
    const newRange = value as [number, number];
    setHeightRange(newRange);
    updateParams({
      minHeight: newRange[0].toString(),
      maxHeight: newRange[1].toString(),
    });
    onFilterChange({
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      attributes: {
        height: [`${newRange[0]}-${newRange[1]}`],
      },
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Price</h3>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={300}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} $</span>
          <span>{priceRange[1]} $</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Height</h3>
        <Slider
          value={heightRange}
          onValueChange={handleHeightChange}
          min={0}
          max={100}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{heightRange[0]} cm</span>
          <span>{heightRange[1]} cm</span>
        </div>
      </div>
    </div>
  );
}
