import { useState } from 'react';

import SyncedCarousel from '../ui/carousel/carousel';
import { Dialog, DialogContent, DialogTitle } from '../ui/modal/modal-utils';

import { formatPrice, getDiscountedPrice } from '@/utils/catalog';
import type { DetailedProductInterface } from '@/utils/interfaces';

export default function DetailedProduct({
  name,
  price,
  description,
  permyriad,
  images = [],
}: DetailedProductInterface): React.JSX.Element {
  const [currenImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="flex justify-center items-start gap-8 p-[50px] max-w-screen-xl mx-auto ">
      <div className="w-1/2">
        <Dialog>
          <SyncedCarousel
            images={images}
            currentImageIndex={currenImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <DialogContent
            aria-describedby={undefined}
            className="flex justify-center items-center p-8 max-w-4xl w-full"
          >
            <DialogTitle></DialogTitle>

            <div className="w-full">
              <SyncedCarousel
                images={images}
                isModal={true}
                currentImageIndex={currenImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <h3 className="font-medium font-serif text-[var(--title-color)] text-[42px] ">
          {name}
        </h3>
        <span className=" inline-block h-[2px] w-[115px] bg-[color:var(--bar-color)]"></span>
        <div className="flex flex-col items-start gap-1">
          {permyriad && permyriad > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <p className="font-inter font-bold text-[var(--accent)] text-2xl">
                  {formatPrice(getDiscountedPrice(price, permyriad))} $
                </p>
                <span className=" inline-block h-[25px] w-[2px] bg-[color:var(--light-bar-color)]"></span>
                <span className="text-[var(--accent)] font-bold text-2xl">
                  Sale!
                </span>
              </div>
              <p className="text-gray-400 line-through text-m">
                {formatPrice(price)}$
              </p>
            </>
          ) : (
            <p className="font-inter font-bold text-[var(--title-color)] text-2xl">
              {formatPrice(price)} $
            </p>
          )}
        </div>

        <p className="font-inter text-[13px] font-normal text-[var(--description-color)] max-w-[425px]">
          {description}
        </p>
        <span className=" inline-block h-[1px] w-full bg-[color:var(--light-bar-color)]"></span>
      </div>
    </div>
  );
}
