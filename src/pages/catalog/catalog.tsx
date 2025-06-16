import { useEffect, useMemo, useRef, useState } from 'react';

import {
  CatalogHeader,
  CatalogControls,
  CatalogProducts,
} from '@/components/catalog';
import { useUrlParams } from '@/hooks/use-url-params';
import useCatalogStore from '@/store/catalog';
import {
  findCategoryById,
  getSubCategories,
  shouldShowSubCategories,
} from '@/utils/catalog';
import type { FilterI } from '@/utils/interfaces';
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
  const topRef = useRef<HTMLDivElement>(null);
  const { initFromUrl, updateParams } = useUrlParams();
  const [temporaryFilters, setTemporaryFilters] = useState<FilterI>(filters);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const filters = initFromUrl();
    setTemporaryFilters(filters);
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
    setTemporaryFilters(updatedFilters);
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const handleBackCategory = (): void => {
    if (parentCategory) {
      handleCategoryChange(parentCategory.id);
    } else {
      handleCategoryChange('all');
    }
  };

  const handleFiltersChange = (newFilters: FilterI): void => {
    setTemporaryFilters(newFilters);
  };

  const handleSheetClose = (): void => {
    setFilters(temporaryFilters);
    updateParams(temporaryFilters);
    fetchFilteredProducts(temporaryFilters);
  };

  const handleSortChange = (value: string): void => {
    const [field, order] = value.split('-');
    const updatedFilters: FilterI = {
      ...temporaryFilters,
      filter: {
        ...temporaryFilters.filter,
        sort: {
          field: field === 'name' ? 'name' : 'variants.prices.centAmount',
          language: 'en',
          order: order as 'asc' | 'desc',
        },
      },
    };

    setTemporaryFilters(updatedFilters);
    setFilters({ filter: updatedFilters.filter });
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (): void => {
    const updatedFilters: FilterI = {
      ...temporaryFilters,
      filter: {
        ...temporaryFilters.filter,
        search: searchValue,
      },
    };

    setTemporaryFilters(updatedFilters);
    setFilters({ filter: updatedFilters.filter });
    updateParams(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const { category: currentCategory, parent: parentCategory } = useMemo(
    () =>
      findCategoryById(selectedCategory || '', categories as NestedCategory[]),
    [selectedCategory, categories]
  );

  const showSubCategories = useMemo(
    () =>
      shouldShowSubCategories(
        selectedCategory || '',
        currentCategory,
        parentCategory
      ),
    [selectedCategory, currentCategory, parentCategory]
  );
  const subCategories = useMemo(
    () => getSubCategories(currentCategory, parentCategory),
    [currentCategory, parentCategory]
  );

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
      <CatalogHeader
        currentCategory={currentCategory}
        parentCategory={parentCategory}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <CatalogControls
        temporaryFilters={temporaryFilters}
        filters={filters}
        categories={categories as NestedCategory[]}
        selectedCategory={selectedCategory}
        showSubCategories={showSubCategories}
        subCategories={subCategories}
        searchValue={searchValue}
        onFiltersChange={handleFiltersChange}
        onSheetClose={handleSheetClose}
        onCategoryChange={handleCategoryChange}
        onBackCategory={handleBackCategory}
        onSortChange={handleSortChange}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        topRef={topRef}
      />

      <CatalogProducts
        products={products}
        filteredProductIds={filters.filteredCatalog || []}
        topRef={topRef}
      />
    </div>
  );
}
