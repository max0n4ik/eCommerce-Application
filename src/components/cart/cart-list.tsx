import { CartItem } from './cart-item';

import { useCartStore } from '@/store/cart-store';
import type { ProductType } from '@/utils/types';

export function CartList({
  productsInCart,
}: {
  productsInCart: ProductType[];
}): React.JSX.Element {
  const { removeFromCart, changeQuantity } = useCartStore();
  const deleteItemFromCart = (lineItemId: string): void => {
    removeFromCart(lineItemId);
  };

  const onChangeQuantity = (lineItemId: string, quantity: number): void => {
    changeQuantity(lineItemId, quantity);
  };
  return (
    <div>
      {productsInCart.length > 0 && (
        <div className="grid grid-cols-4 font-semibold bg-gray-100 p-2 rounded-t text-center">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      )}
      <ul className="w-full">
        {productsInCart.map((product) => {
          const {
            lineItemId,
            productKey,
            productName,
            variants,
            price,
            currency,
            isDiscount,
            priceDiscount,
            quantity,
            totalPrice,
            isPromo,
            promoPrice,
          } = product;
          return (
            <li
              className="grid grid-cols-4 items-center gap-2 border-b p-2"
              key={productKey}
            >
              <CartItem
                lineItemId={lineItemId}
                productName={productName}
                images={variants[0].images || []}
                variant={variants[0]}
                price={price}
                currency={currency}
                isDiscount={isDiscount}
                priceDiscount={priceDiscount}
                totalPrice={totalPrice}
                quantity={quantity ?? 1}
                isPromo={isPromo}
                promoPrice={promoPrice}
                onDelete={deleteItemFromCart}
                onChangeQuantity={onChangeQuantity}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
