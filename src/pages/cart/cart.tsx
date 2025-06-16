import { useEffect } from 'react';

import { CartList } from '@/components/cart';
import { useCartStore } from '@/store/cart-store';

export default function Cart(): React.JSX.Element {
  const { getCart, productsInCart } = useCartStore();
  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-[54px] font-serif  font-semibold">Cart</p>
      <CartList productsInCart={productsInCart} />
    </div>
  );
}
