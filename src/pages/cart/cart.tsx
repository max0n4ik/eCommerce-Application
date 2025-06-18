import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CartList } from '@/components/cart';
import { useCartStore } from '@/store/cart-store';

export default function Cart(): React.JSX.Element {
  const { getCart, productsInCart } = useCartStore();
  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className="flex justify-center items-center flex-col mt-14 mb-28">
      <p className="text-[54px] font-serif  font-semibold">Cart</p>
      <CartList productsInCart={productsInCart} />
      {productsInCart.length === 0 && (
        <div className="text-gray-500 text-lg mt-4">
          Your cart is empty. Start{' '}
          <Link className="underline hover:text-destructive" to="/catalog">
            shopping
          </Link>
          !
        </div>
      )}
    </div>
  );
}
