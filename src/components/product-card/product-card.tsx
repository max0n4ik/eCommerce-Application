import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/product/${id}`} className="block">
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
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-medium text-lg text-[var(--gray)]">{name}</h3>
          <h5 className="line-clamp-2">{description?.en}</h5>
          <div className="flex items-center gap-2">
            {permyriad && permyriad > 0 ? (
              <>
                <p className="text-gray-400 line-through text-base">
                  {formatPrice(price)}{' '}
                  <span className="ml-1 font-normal">$</span>
                </p>
                <p className="text-base font-semibold text-red-600">
                  {formatPrice(getDiscountedPrice(price, permyriad))}{' '}
                  <span className="ml-1 font-normal">$</span>
                </p>
              </>
            ) : (
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(price)} <span className="ml-1 font-normal">$</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
