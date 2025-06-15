import { Search, SlidersHorizontal } from 'lucide-react';

import { CategoryToggle } from '@/components/category-toggle';
import { Filter } from '@/components/filter';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FILTER_CONSTANTS } from '@/utils/constantes';
import type { FilterI } from '@/utils/interfaces';
import type { NestedCategory } from '@/utils/types';

interface CatalogControlsProps {
  temporaryFilters: FilterI;
  filters: FilterI;
  categories: NestedCategory[];
  selectedCategory: string | null;
  showSubCategories: boolean;
  subCategories: NestedCategory[];
  searchValue: string;
  onFiltersChange: (filters: FilterI) => void;
  onSheetClose: () => void;
  onCategoryChange: (value: string) => void;
  onBackCategory: () => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function CatalogControls({
  temporaryFilters,
  filters,
  categories,
  selectedCategory,
  showSubCategories,
  subCategories,
  searchValue,
  onFiltersChange,
  onSheetClose,
  onCategoryChange,
  onBackCategory,
  onSortChange,
  onSearchChange,
  onSearch,
  onKeyPress,
}: CatalogControlsProps): React.JSX.Element {
  return (
    <div id="catalog-controls-container" className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <Sheet onOpenChange={(open) => !open && onSheetClose()}>
          <SheetTrigger className="h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
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
              onFiltersChange={onFiltersChange}
            />
          </SheetContent>
        </Sheet>

        {(temporaryFilters.filter.price ||
          Object.keys(temporaryFilters.filter.attributes || {}).length > 0) && (
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
              onCategoryChange={onCategoryChange}
              onBack={onBackCategory}
              showBackButton
            />
          ) : (
            <CategoryToggle
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              showBackButton={false}
            />
          )}
        </div>
        <div>
          <Select
            onValueChange={onSortChange}
            value={`${
              filters.filter.sort.field === 'name' ? 'name' : 'price'
            }-${filters.filter.sort.order}`}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Input
            placeholder="Search"
            name="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <button className="absolute top-2 right-3" onClick={onSearch}>
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
}
