import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { allowedCountries, postalCodePatterns } from './const-for-validation';

import { cn } from '@/lib/utils';
import { Button } from '@/pages/registration/button';
import { Input } from '@/pages/registration/input';
import { Label } from '@/pages/registration/label';

type Props = {
  onNext: () => void;
};

const formSchema = z
  .object({
    country: z
      .string()
      .min(1, 'Name must be at least 1 character')
      .refine((value) => allowedCountries.has(value), {
        message: 'Country must be from the European Union',
      }),
    city: z
      .string()
      .min(1, 'City must contain at least one character ')
      .regex(/^[A-Za-z\s-]+$/, 'City must contain only letters'),
    street: z.string().min(1, 'Street must contain at least one character'),
    house: z.string().min(1, 'House is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  })
  .superRefine((data, ctx) => {
    const pattern = postalCodePatterns[data.country];
    if (pattern && !pattern.test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        message: 'Invalid postal code format for the selected country',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export function RegistrationFormThird({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [useDefault, setUseDefault] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleUseDefaultChange = () => {
    const newValue = !useDefault;
    setUseDefault(newValue);
    if (newValue) setUseAsBilling(false);
  };

  const handleUseAsBillingChange = () => {
    const newValue = !useAsBilling;
    setUseAsBilling(newValue);
    if (newValue) setUseDefault(false);
  };
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form data:', data);
    onNext();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Shipping address
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Country</Label>
          <Input
            id="country"
            type="text"
            placeholder="Country"
            required
            {...register('country')}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">City</Label>
          </div>
          <Input
            id="city"
            type="text"
            placeholder="City"
            required
            {...register('city')}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Street</Label>
          </div>
          <Input
            id="street"
            type="text"
            placeholder="Street"
            required
            {...register('street')}
          />
          {errors.street && (
            <p className="text-sm text-red-500">{errors.street.message}</p>
          )}
        </div>
        <div className="flex gap-5">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">House</Label>
            </div>
            <Input
              id="house"
              type="text"
              placeholder="House"
              required
              {...register('house')}
            />
            {errors.house && (
              <p className="text-sm text-red-500">{errors.house.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Post code</Label>
            </div>
            <Input
              id="poste-code"
              type="text"
              placeholder="Post code"
              required
              {...register('postalCode')}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useDefault}
              onChange={handleUseDefaultChange}
            />
            <Label id="use-default">Use as default</Label>
          </div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useAsBilling}
              onChange={handleUseAsBillingChange}
            />
            <Label id="use-as-billing">Use this address as billing</Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Have an account?{' '}
        <a href="e" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
