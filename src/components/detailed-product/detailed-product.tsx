import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import SyncedCarousel from '../ui/carousel/carousel';
import { Dialog, DialogContent, DialogTitle } from '../ui/modal/modal-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Toaster } from '../ui/toaster';

import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, getDiscountedPrice } from '@/utils/catalog';
import type { DetailedProductInterface } from '@/utils/interfaces';

export default function DetailedProduct({
  name,
  price,
  description,
  permyriad,
  images = [],
  variants,
  masterVariant,
}: DetailedProductInterface): React.JSX.Element {
  const [currenImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    masterVariant?.sku || ''
  );
  const { toast } = useToast();
  const { addToCart, removeProductFromCart, isProductInCart } = useCartStore();

  useEffect(() => {
    if (selectedVariant) {
      const initialIsInCart = isProductInCart(selectedVariant);

      setIsInCart(initialIsInCart);
    }
  }, [isProductInCart, selectedVariant, variants]);

  const handleAddToCart = async (): Promise<void> => {
    const sku = selectedVariant || masterVariant?.sku;
    if (!sku) return;

    await addToCart(sku, 1).catch((error) => {
      toast({
        variant: 'destructive',
        title: 'Error adding to cart',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    });

    const tempIsInCart = isProductInCart(sku);

    setIsInCart(tempIsInCart);
    toast({
      variant: 'success',
      title: 'Product added to cart',
      duration: 500,
      description: `${name} has been added to your cart.`,
    });
  };
  const handleRemoveFromCart = (): void => {
    removeProductFromCart(selectedVariant);

    const tempIsInCart = isProductInCart(selectedVariant);

    setIsInCart(tempIsInCart);
    toast({
      variant: 'success',
      title: 'Product removed from cart',
      duration: 500,
      description: `${name} has been removed from your cart.`,
    });
  };
  const handleHeightChange = (selectedVariant: string): void => {
    setSelectedVariant(selectedVariant);

    if (selectedVariant) {
      const tempIsInCart = isProductInCart(selectedVariant);
      setIsInCart(tempIsInCart);
    }
  };

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
            className="flex justify-center items-center w-full max-w-[385px] max-h-[55vh] p-4  sm:p-4 md:p-8 sm:max-w-sm md:max-w-2xl  md:[max-height:fit-content] overflow-y-auto"
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
        <div className="flex gap-2">
          <Select
            onValueChange={(value) => handleHeightChange(value)}
            defaultValue={masterVariant?.sku || ''}
          >
            <SelectTrigger className="w-full max-w-[200px]">
              <SelectValue placeholder="Select Height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={masterVariant?.sku || ''}>
                {masterVariant?.attributes?.find(
                  (attr) => attr.name === 'height'
                )?.value || 'Default Height'}
              </SelectItem>
              {variants.map((variant) => (
                <SelectItem
                  key={variant.id}
                  value={variant.sku || ''}
                  className="capitalize"
                >
                  {variant.attributes?.find((attr) => attr.name === 'height')
                    ?.value || 'Default Height'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isInCart ? (
            <>
              <Button className="bg-destructive" onClick={handleRemoveFromCart}>
                Remove from cart
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleAddToCart}
                className="bg-transparent border border-black capitalize text-black font-inter hover:bg-primary hover:text-white hover:border-primary hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
              >
                add to cart
              </Button>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
