import { useState, useRef } from 'react';

import { DialogTrigger } from '../modal/modal-utils';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel/carousel-utils';

interface Props {
  images: { url: string; alt?: string }[];
  isModal?: boolean;
  currentImageIndex?: number;
  setCurrentImageIndex?: (currenImageIndex: number) => void;
}

export default function SyncedCarousel({
  images,
  isModal = false,
  currentImageIndex = undefined,
  setCurrentImageIndex = undefined,
}: Props): React.JSX.Element {
  const mainEmblaRef = useRef<CarouselApi | null>(null);
  const thumbEmblaRef = useRef<CarouselApi | null>(null);
  let startIndex = 0;
  const [jump, setJump] = useState(isModal);

  if (currentImageIndex) {
    startIndex = currentImageIndex;
  }
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  const onThumbClick = (index: number): void => {
    mainEmblaRef.current?.scrollTo(index);
  };
  function updateIndex(index: number): void {
    setSelectedIndex(index);
    if (setCurrentImageIndex) {
      setCurrentImageIndex(index);
    }
  }
  return (
    <div
      className={
        isModal ? 'w-full max-w-4xl mx-auto' : 'w-full max-w-md mx-auto'
      }
    >
      <Carousel
        className="relative w-full"
        setApi={(api) => {
          if (!api) return;
          mainEmblaRef.current = api;
          api.scrollTo(selectedIndex, jump);
          setJump(false);
          api.on('select', () => {
            const index = api.selectedScrollSnap();
            updateIndex(index);

            thumbEmblaRef.current?.scrollTo(index);
          });

          api.on('reInit', () => {
            const index = api.selectedScrollSnap();
            updateIndex(index);

            thumbEmblaRef.current?.scrollTo(index);
          });
        }}
        opts={{ loop: true }}
      >
        <DialogTrigger>
          <CarouselContent>
            {images.map((image, i) => (
              <CarouselItem key={i}>
                <img
                  src={image.url}
                  alt={image.alt || `Image ${i + 1}`}
                  className={
                    isModal
                      ? 'w-full max-w-sm  max-h-[32vh] object-contain sm:max-h-[32vh] md:max-h-[60vh] lg:max-h-[60vh] xl:max-h-[70vh] mx-auto'
                      : 'w-full object-contain max-h-[400px]'
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </DialogTrigger>
        <CarouselPrevious
          className={
            isModal
              ? '-left-6 top-1/2 -translate-y-1/2 !h-8 !w-8 sm:-left-6  md:-left-4 lg:-left-4'
              : '-left-10 top-1/2 -translate-y-1/2 !h-8 !w-8 sm:-left-12  md:-left-10 lg:-left-4'
          }
        />
        <CarouselNext
          className={
            isModal
              ? '-right-6 top-1/2 -translate-y-1/2 !h-8 !w-8 sm:-right-4 md:-right-6 lg:-right-4'
              : '-right-10 top-1/2 -translate-y-1/2 !h-8 !w-8 sm:-right-12 md:-right-8 lg:-right-4 '
          }
        />
      </Carousel>

      <Carousel
        className="relative w-full mt-4"
        opts={{ align: 'start' }}
        setApi={(api) => {
          thumbEmblaRef.current = api;
        }}
      >
        <CarouselContent className="flex -ml-2 justify-center">
          {images.map((image, i) => (
            <CarouselItem
              key={i}
              className={`pl-2 basis-1/4 shrink-0 cursor-pointer  ${
                selectedIndex === i ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => onThumbClick(i)}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${i + 1}`}
                className={
                  isModal
                    ? 'w-full h-40 sm:h-20 md:h-28 lg:h-32  object-contain'
                    : 'w-full h-20 sm:h-20 md:h-28 lg:h-32 object-cover'
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
