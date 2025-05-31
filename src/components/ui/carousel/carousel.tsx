import { useState, useRef } from 'react';

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
}

export default function SyncedCarousel({ images }: Props): React.JSX.Element {
  const mainEmblaRef = useRef<CarouselApi | null>(null);
  const thumbEmblaRef = useRef<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = (index: number): void => {
    mainEmblaRef.current?.scrollTo(index);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel
        className="relative w-full"
        setApi={(api) => {
          if (!api) return;
          mainEmblaRef.current = api;
          setSelectedIndex(api.selectedScrollSnap());

          api.on('select', () => {
            const index = api.selectedScrollSnap();
            setSelectedIndex(index);
            thumbEmblaRef.current?.scrollTo(index);
          });

          api.on('reInit', () => {
            const index = api.selectedScrollSnap();
            setSelectedIndex(index);
            thumbEmblaRef.current?.scrollTo(index);
          });
        }}
      >
        <CarouselContent>
          {images.map((image, i) => (
            <CarouselItem key={i}>
              <img
                src={image.url}
                alt={image.alt || `Image ${i + 1}`}
                className="w-full object-contain max-h-[400px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel
        className="relative w-full mt-4"
        opts={{ align: 'start' }}
        setApi={(api) => {
          thumbEmblaRef.current = api;
        }}
      >
        <CarouselContent className="flex -ml-2">
          {images.map((image, i) => (
            <CarouselItem
              key={i}
              className={`pl-2 basis-1/4 shrink-0 cursor-pointer ${
                selectedIndex === i ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => onThumbClick(i)}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${i + 1}`}
                className="w-full h-20 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
