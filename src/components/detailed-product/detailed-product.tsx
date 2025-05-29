import { formatPrice, getDiscountedPrice } from '@/utils/catalog';
import type { DetailedProductInterface } from '@/utils/interfaces';

export default function DetailedProduct({
  id,
  imageUrl,
  imageAlt,
  name,
  price,
  description,
  permyriad,
}: DetailedProductInterface): React.JSX.Element {
  return (
    <div key={id}>
      <div>
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-96 w-full object-cover object-[center_top]"
            />
          ) : (
            <div className="h-72 w-full bg-gray-100" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-lg text-[var(--gray)]">{name}</h3>
          <span></span>
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
          <h5 className="line-clamp-2">{description?.en}</h5>
          <div>
            <></>
          </div>
        </div>
      </div>
    </div>
  );
}
