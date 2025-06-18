import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/modal/modal-utils';

import { CartItem } from './cart-item';

import { useCartStore } from '@/store/cart-store';
import { FILTER_CONSTANTS } from '@/utils/constantes';
import type { ProductType } from '@/utils/types';

export function CartList({
  productsInCart,
}: {
  productsInCart: ProductType[];
}): React.JSX.Element {
  const { removeFromCart, changeQuantity, clearCart } = useCartStore();
  const deleteItemFromCart = (lineItemId: string): void => {
    removeFromCart(lineItemId);
  };

  const onChangeQuantity = (lineItemId: string, quantity: number): void => {
    changeQuantity(lineItemId, quantity);
  };
  return (
    <div className="flex items-start justify-between w-full max-w-[1340px] mx-auto gap-6 ">
      <div className="flex-1 border rounded-sm">
        {productsInCart.length > 0 && (
          <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 font-semibold bg-gray-100 p-2 rounded-t text-center">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>
        )}
        <ul>
          {productsInCart.map((product) => {
            const {
              lineItemId,

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
                className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2 p-2"
                key={lineItemId}
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
      <div>
        {productsInCart.length > 0 && (
          <div className="border rounded-sm p-6 pt-2 min-w-[300px] flex flex-col">
            <div className="mb-4 border-b pb-2">
              <p className="font-serif font-bold text-lg">Cart totals</p>
            </div>
            <p className="flex justify-between py-2">
              Subtotal
              <span>
                {productsInCart.reduce(
                  (acc, item) => acc + (item.totalPrice ?? 0),
                  0
                ) / FILTER_CONSTANTS.PRICE.DIVIDE}
                {'$'}
              </span>
            </p>
            <p className="flex justify-between py-2 border-t">
              Total
              <span>
                {productsInCart.reduce(
                  (acc, item) => acc + (item.totalPrice ?? 0),
                  0
                ) / FILTER_CONSTANTS.PRICE.DIVIDE}
                {'$'}
              </span>
            </p>
            <button className="text-gray-400 border-none mt-4 text-sm">
              Have a coupon?
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Clear all cart</Button>
              </DialogTrigger>
              <DialogContent className="border rounded-sm p-6 pt-2 min-w-[300px] flex flex-col justify-center">
                <div className="pt-4">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Clear Cart?
                    </DialogTitle>
                    <DialogDescription className="text-center my-2">
                      Do you want to clear all items from the cart?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col justify-center gap-2 mt-4">
                    <Button className="bg-destructive" onClick={clearCart}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
