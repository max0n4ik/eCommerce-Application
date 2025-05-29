import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useCatalogStore from '@/store/catalog';

export default function Product(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { productLoading, error, fetchProduct } = useCatalogStore();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  if (productLoading) {
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
  return <div>Product page ID: {id}</div>;
}
