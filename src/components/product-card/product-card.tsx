import { Link } from 'react-router-dom';

import AddToCartIcon from '@/assets/images/add-to-cart.png';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, getDiscountedPrice } from '@/utils/catalog';
import type { ProductCardI } from '@/utils/interfaces';

export default function ProductCard({
  imageUrl,
  imageAlt,
  id,
  price,
  permyriad,
  name,
  description,
}: ProductCardI): React.JSX.Element {
  const { addToCart } = useCartStore();
  const handleAddToCart = async (): Promise<void> => {
    await addToCart(id, 1);
  };

  return (
    <Link to={`/product/${id}`} className="block relative">
      <div key={id} className="product-card cursor-pointer">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-96 w-full object-cover object-[center_top]"
          />
        ) : (
          <div className="h-72 w-full bg-gray-100" />
        )}
        <div className="p-3 flex flex-col gap-2">
          <h3 className="font-medium text-lg text-[var(--gray)]">{name}</h3>
          <h5 className="line-clamp-2">{description?.en}</h5>
          <div className="flex items-center gap-2 justify-between">
            {permyriad && permyriad > 0 ? (
              <div>
                <p className="text-base font-semibold text-red-600">
                  {formatPrice(getDiscountedPrice(price, permyriad))}{' '}
                  <span className="ml-1 font-normal">$</span>
                </p>
                <p className="text-gray-400 line-through text-sm">
                  {formatPrice(price)}{' '}
                  <span className="ml-1 font-normal">$</span>
                </p>
              </div>
            ) : (
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(price)} <span className="ml-1 font-normal">$</span>
              </p>
            )}
            <button
              onClick={handleAddToCart}
              className="hover:pointer-events-auto transition-transform duration-300 ease-in-out hover:scale-110 z-100 absolute p-2 right-1"
            >
              <img
                className="w-[30px] h-[30px]"
                src={AddToCartIcon}
                alt="add-to-cart"
              ></img>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
