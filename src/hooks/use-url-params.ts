import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import useCatalogStore from '@/store/catalog';
import {
  getUrlParamsFromFilters,
  initializeFiltersFromUrl,
} from '@/utils/filter-products';
import type { FilterI } from '@/utils/interfaces';

export const useUrlParams = (): {
  updateParams: (params: FilterI) => void;
  initFromUrl: () => FilterI;
} => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setFilters, setSelectedCategory } = useCatalogStore();

  const updateParams = useCallback(
    (params: FilterI) => {
      const urlParams = getUrlParamsFromFilters(params);
      const newParams = new URLSearchParams();

      Object.entries(urlParams).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        }
      });

      setSearchParams(newParams);
      setFilters(params);
    },
    [setSearchParams, setFilters]
  );

  const initFromUrl = useCallback((): FilterI => {
    const params = Object.fromEntries(searchParams.entries());
    const filters = initializeFiltersFromUrl(params, {
      filter: {
        price: { min: 0, max: 30000 },
        attributes: {},
      },
    });

    if (filters.filter.category) {
      setSelectedCategory(filters.filter.category);
    }

    setFilters(filters);
    return filters;
  }, [searchParams, setFilters, setSelectedCategory]);

  return { updateParams, initFromUrl };
};
