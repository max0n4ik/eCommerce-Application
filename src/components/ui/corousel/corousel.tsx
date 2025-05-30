import { useState, useEffect } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface Props {
  images: { url: string; alt?: string }[];
}

export default function SyncedCarousel({ images }: Props) {
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi | null>(null);
  const [emblaThumbApi, setEmblaThumbApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Синхронизируем выбранный слайд
  function onSelect() {
    if (!emblaMainApi || !emblaThumbApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbApi.scrollTo(index);
  }

  function onThumbClick(index: number) {
    if (!emblaMainApi) return;
    emblaMainApi.scrollTo(index);
  }

  useEffect(() => {
    if (!emblaMainApi) return;

    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);

    // При размонтировании удаляем слушатели
    return () => {
      emblaMainApi.off('select', onSelect);
      emblaMainApi.off('reInit', onSelect);
    };
  }, [emblaMainApi, emblaThumbApi]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Главный слайдер */}
      <Carousel className="relative w-full" onInitApi={setEmblaMainApi}>
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

      {/* Миниатюры */}
      <Carousel className="relative w-full mt-4" onInitApi={setEmblaThumbApi}>
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
                className="w-full h-20 object-cover rounded"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
