import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Toaster } from '../ui/toaster';

import AddToCartIcon from '@/assets/images/add-to-cart.png';
import { useToast } from '@/hooks/use-toast';
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
  masterVariant,
}: ProductCardI): React.JSX.Element {
  const { addToCart, isProductInCart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (masterVariant) {
      const initialIsInCart = isProductInCart(masterVariant.sku ?? '');

      setIsAdded(initialIsInCart);
    }
  }, [isProductInCart, masterVariant]);

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(masterVariant?.sku ?? '', 1).catch((error) => {
      toast({
        title: 'Error adding product to cart',
        description: `${error} has occurred.`,
        duration: 3000,
        variant: 'destructive',
      });
    });
    setIsAdded(true);
    toast({
      title: 'Product added to cart',
      description: `${name} has been added to your cart.`,
      duration: 3000,
      variant: 'success',
    });
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
              disabled={isAdded}
              className={`hover:pointer-events-auto transition-transform duration-300 ease-in-out hover:scale-110 z-100 absolute p-2 right-1 ${
                isAdded ? 'cursor-not-allowed' : ''
              }`}
            >
              {isAdded ? (
                <Check className="w-[30px] h-[30px] text-green-500" />
              ) : (
                <img
                  className="w-[30px] h-[30px]"
                  src={AddToCartIcon}
                  alt="add-to-cart"
                ></img>
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </Link>
  );
}
