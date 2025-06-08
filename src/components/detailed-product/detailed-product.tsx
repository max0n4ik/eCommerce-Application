import { useState } from 'react';

import { Button } from '../ui/button';
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
    <div className="flex flex-row max-[780px]:flex-col  max-[780px]:items-center justify-center gap-10 p-[50px] max-w-screen-xl mx-auto">
      <div className="w-1/2 max-[780px]:w-full flex flex-col gap-4">
        <Dialog>
          <SyncedCarousel
            images={images}
            currentImageIndex={currenImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <DialogContent
            aria-describedby={undefined}
            className="flex justify-center items-center w-full max-w-[385px] max-h-[55vh] p-4  sm:p-4 md:p-8 max-w-sm sm:max-w-sm md:max-w-2xl  md:[max-height:fit-content] overflow-y-auto"
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
      <div className="w-1/2 max-[780px]:w-full flex flex-col gap-4">
        <h3 className="font-medium font-serif text-[var(--title-color)] text-[42px] max-[500px]:text-[28px] max-[400px]:text-[20px]">
          {name}
        </h3>
        <span className=" inline-block h-[2px] w-[115px] max-[400px]:w-[80px] bg-[color:var(--bar-color)]"></span>
        <div className="flex flex-col items-start gap-1">
          {permyriad && permyriad > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <p className="font-inter font-bold text-[var(--accent)] text-2xl max-[500px]:text-xl max-[400px]:text-sm">
                  {formatPrice(getDiscountedPrice(price, permyriad))} $
                </p>
                <span className=" inline-block h-[25px] w-[2px] bg-[color:var(--light-bar-color)]"></span>
                <span className="text-[var(--accent)] font-bold text-2xl max-[500px]:text-xl max-[400px]:text-sm">
                  Sale!
                </span>
              </div>
              <p className="text-gray-400 line-through text-m max-[500px]:text-sm">
                {formatPrice(price)}$
              </p>
            </>
          ) : (
            <p className="font-inter font-bold text-[var(--title-color)] text-2xl max-[500px]:text-xl">
              {formatPrice(price)} $
            </p>
          )}
        </div>
        <p className="font-inter text-[13px] font-normal text-[var(--description-color)] max-w-[425px] max-[500px]:max-w-none max-[500px]:w-full  max-[500px]:text-[12px]">
          {description}
        </p>
        <span className=" inline-block h-[1px] w-full bg-[color:var(--light-bar-color)]"></span>
        <div>
          <Button className="bg-transparent border border-black capitalize text-black font-inter hover:bg-[#586F69] hover:text-white hover:border-[#586F69] hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
            add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
