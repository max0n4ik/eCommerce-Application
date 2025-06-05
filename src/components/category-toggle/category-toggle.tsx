import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { CategoryCard } from '@/utils/interfaces';
import type { NestedCategory } from '@/utils/types';

interface CategoryToggleProps {
  categories: NestedCategory[] | CategoryCard[];
  selectedCategory: string | null;
  onCategoryChange: (value: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function CategoryToggle({
  categories,
  selectedCategory,
  onCategoryChange,
  onBack,
  showBackButton = false,
}: CategoryToggleProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      {showBackButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      <ToggleGroup
        type="single"
        className="bg-primary rounded-xl p-1"
        value={selectedCategory || 'all'}
        onValueChange={(value) => value && onCategoryChange(value)}
      >
        {!showBackButton && (
          <ToggleGroupItem
            value="all"
            className="text-white data-[state=on]:bg-white/20 px-5 rounded-xl"
          >
            All
          </ToggleGroupItem>
        )}
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
  );
}
