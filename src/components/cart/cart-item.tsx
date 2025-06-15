import { CircleX, Minus, Plus } from 'lucide-react';

import { Button } from '../ui/button';

import { FILTER_CONSTANTS } from '@/utils/constantes';
import type { CartItem } from '@/utils/types';

export function CartItem({
  lineItemId,
  productName,
  images,

  price,

  totalPrice,
  quantity,

  onDelete,
  onChangeQuantity,
}: CartItem & {
  onDelete: (lineItemId: string) => void;
  onChangeQuantity: (lineItemId: string, quantity: number) => void;
}): React.JSX.Element {
  return (
    <>
      <div className="flex items-center gap-4">
        <button onClick={() => onDelete(lineItemId)}>
          <CircleX />
        </button>
        <img
          className="w-[72px] h-auto"
          src={images[0]?.url}
          alt={productName}
        />
        <p>{productName}</p>
      </div>

      <div className="flex items-center justify-center">
        <p> {price / FILTER_CONSTANTS.PRICE.DIVIDE} $</p>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChangeQuantity(lineItemId, quantity - 1)}
          aria-label="Decrease quantity"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-8 text-center text-sm font-medium">{quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChangeQuantity(lineItemId, quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <p>{totalPrice ? totalPrice / FILTER_CONSTANTS.PRICE.DIVIDE : 0} $</p>
      </div>
    </>
  );
}
