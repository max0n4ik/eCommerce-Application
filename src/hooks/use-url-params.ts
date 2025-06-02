import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minHeight?: string;
  maxHeight?: string;
}

export const useUrlParams = (): {
  updateParams: (params: FilterParams) => void;
  getParams: () => FilterParams;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (params: FilterParams) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const getParams = useCallback((): FilterParams => {
    const params: FilterParams = {};
    searchParams.forEach((value, key) => {
      params[key as keyof FilterParams] = value;
    });
    return params;
  }, [searchParams]);

  return { updateParams, getParams };
};
