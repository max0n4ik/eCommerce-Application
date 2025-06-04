import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useUrlParams } from '@/hooks/use-url-params';
import useCatalogStore from '@/store/catalog';

export default function Filter(): React.ReactElement {
  const { filters } = useCatalogStore();
  const { updateParams } = useUrlParams();

  const handlePriceChange = (value: number[]): void => {
    const newFilters = {
      ...filters,
      filter: {
        ...filters.filter,
        price: { min: value[0], max: value[1] },
      },
    };
    updateParams(newFilters);
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
    updateParams(newFilters);
  };

  const resetFilters = (): void => {
    const defaultFilters = {
      filter: {
        price: { min: 0, max: 30000 },
        attributes: {},
      },
    };
    updateParams(defaultFilters);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Price</h3>
          <Slider
            value={[filters.filter.price.min, filters.filter.price.max]}
            onValueChange={handlePriceChange}
            min={0}
            max={30000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.filter.price.min / 100} $</span>
            <span>{filters.filter.price.max / 100} $</span>
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
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {filters.filter.attributes?.height?.[0]?.split('-')[0] || 0} cm
            </span>
            <span>
              {filters.filter.attributes?.height?.[0]?.split('-')[1] || 100} cm
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
