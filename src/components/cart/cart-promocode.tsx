import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { toast } from '@/hooks/use-toast';
import { promoCode } from '@/utils/constantes';

type Props = {
  onChange?: (code: string) => void;
};

export function PromoCode({ onChange }: Props): React.JSX.Element {
  const [code, setCode] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  const handleClick = (): void => {
    if (!code) {
      return;
    }

    if (code !== promoCode) {
      toast({
        title: 'Invalid promo code',
        description: 'Please enter a valid promo code.',
        variant: 'destructive',
      });
      return;
    }

    if (onChange) {
      onChange(code.trim());
      setCode('');
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div>
        <Input
          type="text"
          placeholder="Enter promo code"
          className="border p-2 text-sm rounded-sm"
          value={code}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <Button onClick={handleClick} size="sm" disabled={!code}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PromoCode;
