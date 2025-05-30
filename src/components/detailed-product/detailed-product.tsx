import SyncedCarousel from '../ui/corousel/corousel';

import { formatPrice, getDiscountedPrice } from '@/utils/catalog';
import type { DetailedProductInterface } from '@/utils/interfaces';

export default function DetailedProduct({
  id,
  name,
  price,
  description,
  permyriad,
  images = [],
}: DetailedProductInterface): React.JSX.Element {
  return (
    <div
      key={id}
      className="flex justify-center items-start gap-8 p-[50px] max-w-screen-xl mx-auto "
    >
      <div className="w-1/2">
        <SyncedCarousel images={images} />
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <h3 className="font-medium font-serif text-[var(--title-color)] text-[42px] ">
          {name}
        </h3>
        <span className=" inline-block h-[2px] w-[115px] bg-[color:var(--bar-color)]"></span>
        <div className="flex items-center gap-2">
          {permyriad && permyriad > 0 ? (
            <>
              <p className="text-gray-400 line-through text-base">
                {formatPrice(price)}$
              </p>
              <p className="text-base font-semibold text-red-600">
                {formatPrice(getDiscountedPrice(price, permyriad))} $
              </p>
            </>
          ) : (
            <p className="font-inter font-bold text-[var(--title-color)] text-2xl ">
              {formatPrice(price)}{' '}
              <span className="font-inter font-bold text-[var(--title-color)] text-2xl ">
                $
              </span>
            </p>
          )}
        </div>

        <p className="ont-inter text-[13px] font-normal text-[var(--description-color)] max-w-[425px]">
          {description}
        </p>
        <span className=" inline-block h-[1px] w-full bg-[color:var(--light-bar-color)]"></span>
      </div>
    </div>
  );
}
