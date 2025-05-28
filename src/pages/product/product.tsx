import React from 'react';
import { useParams } from 'react-router-dom';

export default function Product(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  return <div>Product page ID: {id}</div>;
}
