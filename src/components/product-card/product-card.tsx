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
    <div key={id} className="border p-4 rounded shadow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="mb-2 rounded object-cover"
        />
      ) : (
        <div className="h-40 bg-gray-100 mb-2 rounded" />
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">{name}</h3>
        <h5 className="line-clamp-2">{description?.en}</h5>
        <div className="flex gap-2 justify-end">
          {permyriad && permyriad > 0 ? (
            <>
              <p className="font-bold text-lg line-through text-gray-500">
                {formatPrice(price)}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
              <p className="font-bold text-lg text-red-600">
                {formatPrice(getDiscountedPrice(price, permyriad))}{' '}
                <span className="font-normal text-lg">$</span>
              </p>
            </>
          ) : (
            <p className="font-bold text-lg">
              {formatPrice(price)}{' '}
              <span className="font-normal text-lg">$</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
