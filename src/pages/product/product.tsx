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
    return <div>Product loading ...</div>;
  }
  if (error) {
    return <div className="color red"></div>;
  }
  return <div>Product page ID: {id}</div>;
}
