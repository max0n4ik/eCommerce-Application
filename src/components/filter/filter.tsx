import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FILTER_CONSTANTS } from '@/utils/constantes';
import type { FilterI } from '@/utils/interfaces';

interface FilterProps {
  filters: FilterI;
  onFiltersChange: (filters: FilterI) => void;
}

export default function Filter({
  filters,
  onFiltersChange,
}: FilterProps): React.ReactElement {
  const handlePriceChange = (value: number[]): void => {
    const newFilters = {
      ...filters,
      filter: {
        ...filters.filter,
        price: { min: value[0], max: value[1] },
      },
    };
    onFiltersChange(newFilters);
  };

  const handleHeightChange = (value: number[]): void => {
    const newFilters = {
      ...filters,
      filter: {
        ...filters.filter,
        attributes: {
          ...filters.filter.attributes,
          height: [`${value[0]}-${value[1]}`],
        },
      },
    };
    onFiltersChange(newFilters);
  };

  const resetFilters = (): void => {
    const defaultFilters: FilterI = {
      filter: {
        price: {
          min: FILTER_CONSTANTS.PRICE.MIN,
          max: FILTER_CONSTANTS.PRICE.MAX,
        },
        attributes: {},
      },
    };
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Price</h3>
          <Slider
            value={[filters.filter.price.min, filters.filter.price.max]}
            onValueChange={handlePriceChange}
            min={FILTER_CONSTANTS.PRICE.MIN}
            max={FILTER_CONSTANTS.PRICE.MAX}
            step={FILTER_CONSTANTS.PRICE.STEP}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {filters.filter.price.min / FILTER_CONSTANTS.PRICE.DIVIDE} $
            </span>
            <span>
              {filters.filter.price.max / FILTER_CONSTANTS.PRICE.DIVIDE} $
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Height</h3>
          <Slider
            value={
              filters.filter.attributes?.height?.[0]
                ?.split('-')
                .map(Number) || [0, 100]
            }
            onValueChange={handleHeightChange}
            min={FILTER_CONSTANTS.HEIGHT.MIN}
            max={FILTER_CONSTANTS.HEIGHT.MAX}
            step={FILTER_CONSTANTS.HEIGHT.STEP}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {filters.filter.attributes?.height?.[0]?.split('-')[0] ||
                FILTER_CONSTANTS.HEIGHT.MIN}{' '}
              cm
            </span>
            <span>
              {filters.filter.attributes?.height?.[0]?.split('-')[1] ||
                FILTER_CONSTANTS.HEIGHT.MAX}{' '}
              cm
            </span>
          </div>
        </div>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset filters
      </Button>
    </div>
  );
}
