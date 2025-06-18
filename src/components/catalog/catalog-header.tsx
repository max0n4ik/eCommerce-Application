import garden from '@/assets/images/plant_background.png';
import type { NestedCategory } from '@/utils/types';

interface CatalogHeaderProps {
  currentCategory: NestedCategory | null | undefined;
  parentCategory: NestedCategory | null | undefined;
  selectedCategory: string | null;
  onCategoryChange: (value: string) => void;
}

export function CatalogHeader({
  currentCategory,
  parentCategory,
  selectedCategory,
  onCategoryChange,
}: CatalogHeaderProps): React.JSX.Element {
  return (
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
          onClick={() => onCategoryChange('all')}
          className="hover:underline"
        >
          Catalog
        </button>
        {parentCategory && (
          <>
            <span>&gt;</span>
            <button
              onClick={() => onCategoryChange(parentCategory.id)}
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
              onClick={() => onCategoryChange(currentCategory.id)}
              className="hover:underline"
            >
              {currentCategory.name}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
